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

                    _logger.LogInformation("Loop");
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
            var network = db.Set<Network>().SingleOrDefault(n => n.Kind == NetworkKind.Bitcoin && n.IsTestnet == _options.IsTestnet);
            if (network == null)
            {
                network = new Network
                {
                    Kind = NetworkKind.Bitcoin,
                    IsTestnet = _options.IsTestnet,
                    LastBlock = _apiClient.GetBlocks()[0].height,
                    LastBlockAt = DateTime.Now,
                    Id = Guid.NewGuid(),
                    Name = "Bitcoin"
                };
                db.Add(network);
                db.SaveChanges();
            }

            foreach (var deposit in db.Set<Deposit>().Where(o => o.Status >= DepositStatus.WaitingForBtc && o.BtcFunded == null && o.Contract.Network.IsTestnet == _options.IsTestnet))
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
            foreach (var deposit in db.Set<Deposit>().Where(o => o.BitcoinAddress != null && o.Contract.Network.IsTestnet == _options.IsTestnet).ToList())
            {
                if (db.Set<Transaction>().Any(t => t.RedeemStatus == RedeemStatus.BtcTransferred && t.RedeemId == deposit.Id))
                    continue;
                foreach(var tx in _apiClient.GetTxs(deposit.BitcoinAddress).Where(x => x.status.confirmed))
				{
                    if (db.Find<Transaction>(tx.txid) == null)
                    {
                        var sender = tx.vin.Count == 1 ? tx.vin[0].prevout.scriptpubkey_address : null;
                        var recipient = tx.vout.Count == 1 ? tx.vout[0].scriptpubkey_address : null;
                        var redeem = db.Find<Redeem>(deposit.Id);
                        if (sender == deposit.BitcoinAddress && redeem == null)
                            continue;
                        var t = new Transaction
                        {
                            Id = tx.txid,
                            Redeem = sender == deposit.BitcoinAddress ? redeem : null,
                            Deposit = sender == deposit.BitcoinAddress ? null : deposit,
                            Block = tx.status.block_height,
                            Status = sender == deposit.BitcoinAddress ? DepositStatus.Closed : DepositStatus.BtcReceived,
                            RedeemStatus = sender == deposit.BitcoinAddress ? RedeemStatus.BtcTransferred : (RedeemStatus?)null,
                            IsError = false,
                            Error = "",
                            Timestamp = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(tx.status.block_time),
                            Amount = (sender == deposit.BitcoinAddress ? tx.vout[0].value / 100000000M : tx.vout.Where(o => o.scriptpubkey_address == deposit.BitcoinAddress).Sum(v => v.value/ 100000000M)) ,
                            Fee = tx.fee / 100000000M,
                            Kind = NetworkKind.Bitcoin,
                            Sender = sender,
                            Recipient = recipient
                        };
                        db.Add(t);
                        _logger.LogInformation($"Saved tx {t.Id} ({t.Timestamp})");
                        if (redeem != null && sender == deposit.BitcoinAddress)
						{
                            redeem.BitcoinAddress = recipient;
                            redeem.BitcoinRedeemedBlock = tx.status.block_height;
                            redeem.BtcRedeemed = t.Amount;
                            redeem.BtcFee = t.Fee;
                        }
                    }
                }
            }
            var currentBlock = _apiClient.GetBlocks()[0];
            network.LastBlock = currentBlock.height;
            network.LastBlockAt = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(currentBlock.timestamp);
            _logger.LogInformation($"Last block processed: {network.LastBlock} ({network.LastBlockAt})");
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