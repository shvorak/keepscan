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
    public class EthereumWorker: BackgroundService
    {
        const string RegisteredPubKeyEvent = "0x8ee737ab16909c4e9d1b750814a4393c9f84ab5d3a29c08c313b783fc846ae33";
        private readonly EthereumWorkerOptions _options;
        private readonly IServiceScopeFactory _scopeFactory;
		private readonly ILogger<EthereumWorker> _logger;
        private readonly Etherscan.Client _apiClient;

        public EthereumWorker(EthereumWorkerOptions options, IServiceScopeFactory scopeFactory, ILogger<EthereumWorker> logger)
        {
            _options = options;
            _scopeFactory = scopeFactory;
            _logger = logger;
            _apiClient = new Etherscan.Client(_options.ApiUrl);
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
                    catch(Exception e)
					{
                        _logger.LogError(e, "EthereumWorker failure");
					}
                }

                await Task.Delay(_options.Interval * 1000, stoppingToken);
            }
        }

        void Run(KeepSpyContext db)
		{
            var network = db.Set<Network>().Single(n => n.Kind == NetworkKind.Ethereum && n.IsTestnet == _options.IsTestnet);
            var contract = db.Set<Contract>().FirstOrDefault(c => c.Active && c.Network == network);
            if (contract == null)
            {
                _logger.LogCritical("No active contract at network {0}", network.Name);
                return;
            }
            var resultTx = _apiClient.GetAccountTxList(contract.Id, network.LastBlock + 1);
            if (resultTx.status != "1")
			{
                _logger.LogWarning("Etherscan api error: {0}", resultTx.message);
                return;
            }
            var resultLogs = _apiClient.GetLogs(contract.Id, network.LastBlock + 1);
            if (resultLogs.status != "1")
            {
                _logger.LogWarning("Etherscan api error: {0}", resultLogs.message);
                return;
            }
            var regpubKeyLogs = _apiClient.GetLogs(null, network.LastBlock + 1, topic0: RegisteredPubKeyEvent);
            if (regpubKeyLogs.status != "1")
            {
                _logger.LogWarning("Etherscan api error: {0}", regpubKeyLogs.message);
                return;
            }
            foreach (var item in resultTx.result)
			{
                if (item.input.StartsWith("0xb7947b40"))
				{
                    var lotSize = uint.Parse(item.input.Substring(66), System.Globalization.NumberStyles.HexNumber) / 100000000M;
                    var eventLog = resultLogs.result.FirstOrDefault(o => o.transactionHash == item.hash);
                    if (eventLog != null)
                    {
                        var tdt_id = "0x" + eventLog.data.Substring(26);
                        var deposit = db.Find<Deposit>(tdt_id);
                        if (deposit == null)
						{
                            deposit = new Deposit
                            {
                                CreatedAt = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(ulong.Parse(item.timeStamp)),
                                Id = tdt_id,
                                LotSize = lotSize,
                                SenderAddress = item.from,
                                Contract = contract,
                                Status = DepositStatus.GettingBtcAddress
                            };
                            db.Add(deposit);
						}
                    }
				}
			}
            foreach(var pubKey in regpubKeyLogs.result)
			{
                var deposit = db.Set<Deposit>().SingleOrDefault(o => o.Id == "0x" + pubKey.topics[1].Substring(26));
                if (deposit != null && deposit.Status == DepositStatus.GettingBtcAddress)
				{
                    var _signingGroupPubkeyX = pubKey.data.Substring(2, 64);
                    var _signingGroupPubkeyY = pubKey.data.Substring(66, 64);
                    var key = NBitcoin.DataEncoders.Encoders.Hex.DecodeData("03" + _signingGroupPubkeyX);

                    var address = new NBitcoin.PubKey(key).GetAddress(NBitcoin.ScriptPubKeyType.Segwit, network.IsTestnet ? NBitcoin.Network.TestNet : NBitcoin.Network.Main).ToString();
                    deposit.BitcoinAddress = address;
                    deposit.Status = DepositStatus.BtcAddressGenerated;
                }
			}
            var lastTx = resultTx.result.Last();
            if (lastTx != null)
            {
                network.LastBlock = uint.Parse(lastTx.blockNumber);
                network.LastBlockAt = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(ulong.Parse(lastTx.timeStamp));
            }
            db.SaveChanges();
        }
    }

    public class EthereumWorkerOptions
    {
        public string ApiUrl { get; set; }
        public int Interval { get; set; }
        public bool IsTestnet { get; set; }
    }
}