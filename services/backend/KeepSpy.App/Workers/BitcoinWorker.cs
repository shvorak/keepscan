using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using KeepSpy.Domain;
using KeepSpy.Storage;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace KeepSpy.App.Workers
{
    public class BitcoinWorker: BackgroundService
    {
        private readonly BitcoinWorkerOptions _options;
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<BitcoinWorker> _logger;
        private readonly Blockstream.Client _apiClient;

        public BitcoinWorker(BitcoinWorkerOptions options, IServiceScopeFactory scopeFactory, ILogger<BitcoinWorker> logger)
        {
            _options = options;
            _scopeFactory = scopeFactory;
            _logger = logger;
            _apiClient = new Blockstream.Client(_options.ApiUrl);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Task.Delay(5000, stoppingToken);
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var db = scope.ServiceProvider.GetRequiredService<KeepSpyContext>();

                    try
                    {
                        Run(db);
                    }
                    catch (Exception e)
                    {
                        _logger.LogError(e, "BitcoinWorker failure");
                    }
                }

                await Task.Delay(_options.Interval * 1000, stoppingToken);
            }
        }

        void Run(KeepSpyContext db)
		{
            var network = db.Set<Network>().Single(n => n.Kind == NetworkKind.Bitcoin && n.IsTestnet == _options.IsTestnet);

            foreach(var deposit in db.Set<Deposit>().Where(o => o.Status >= DepositStatus.WaitingForBtc && o.BtcFunded == null && o.Contract.Network.IsTestnet == _options.IsTestnet))
			{
                var utxo = _apiClient.GetUtxo(deposit.BitcoinAddress);
                var amount = utxo.Where(o => o.status.confirmed).Sum(o => o.value) / 100000000M;
                if (amount >= deposit.LotSize)
				{
                    deposit.BtcFunded = amount;
                    if (deposit.Status == DepositStatus.WaitingForBtc)
                        deposit.Status = DepositStatus.BtcReceived;
                    deposit.BitcoinFundedBlock = utxo.Where(o => o.status.confirmed).Max(o => o.status.block_height);
                    _logger.LogInformation("TDT {0} funded with {1} BTC", deposit.Id, utxo.Where(o => o.status.confirmed).Sum(o => o.value) / 100000000M);
                }
            }
            var currentBlock = _apiClient.GetBlocks()[0];
            network.LastBlock = currentBlock.height;
            network.LastBlockAt = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(currentBlock.timestamp);
            db.SaveChanges();
        }
    }

    public class BitcoinWorkerOptions
    {
        public string ApiUrl { get; set; }
        public int Interval { get; set; }
        public bool IsTestnet { get; set; }
    }
}