using System;
using System.Globalization;
using System.Linq;
using System.Numerics;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using KeepSpy.App.Ethereum;
using KeepSpy.App.Services;
using KeepSpy.Domain;
using KeepSpy.Storage;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace KeepSpy.App.Workers
{
    public class EthereumWorker : BackgroundService
    {
        const string RegisteredPubKeyEvent = "0x8ee737ab16909c4e9d1b750814a4393c9f84ab5d3a29c08c313b783fc846ae33";
        const string FundedEvent = "0xe34c70bd3e03956978a5c76d2ea5f3a60819171afea6dee4fc12b2e45f72d43d";
        const string TransferEvent = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
        const string ApprovalEvent = "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925";
        const string GotRedemptionSignatureEvent = "0x7f7d7327762d01d2c4a552ea0be2bc5a76264574a80aa78083e691a840e509f2";
        const string RedeemedEvent = "0x44b7f176bcc739b54bd0800fe491cbdea19df7d4d6b19c281462e6b4fc504344";
        const string StartedLiquidationEvent = "0xbef11c059eefba82a15aea8a3a89c86fd08d7711c88fa7daea2632a55488510c";
        const string LiquidatedEvent = "0xa5ee7a2b0254fce91deed604506790ed7fa072d0b14cba4859c3bc8955b9caac";
        const string SetupFailedEvent = "0x8fd2cfb62a35fccc1ecef829f83a6c2f840b73dad49d3eaaa402909752086d4b";
        const string BondedECDSAKeepCreatedEvent = "0x7c030f3f8c902fa5a59193f1e3c08ae7245fc0e3b7ab290b6a9548a57a46ac60";
        const string BondCreatedEvent = "0xa5543d8e139d9ab4342d5c4f6ec1bff5a97f9a52d71f7ffe9845b94f1449fc91";
        const string DepositCloneCreatedEvent = "0x1d6e7961301df0f19b325bf7669f5b932069b5ad8f9b71292351c7bed17cf4f1";
        const string RedemptionRequestedEvent = "0x7959c380174061a21a3ba80243a032ba9cd10dc8bd1736d7e835c94e97a35a98";
        const string CourtesyCalledEvent = "0x6e7b45210b79c12cd1332babd8d86c0bbb9ca898a89ce0404f17064dbfba18c0";

        private readonly EthereumWorkerOptions _options;
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<EthereumWorker> _logger;
        private readonly Etherscan.Client _apiClient;

        public EthereumWorker(EthereumWorkerOptions options, IServiceScopeFactory scopeFactory,
            ILogger<EthereumWorker> logger)
        {
            _options = options;
            _scopeFactory = scopeFactory;
            _logger = logger;
            _apiClient = new Etherscan.Client(_options.ApiUrl);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Task.Delay(35000, stoppingToken);
            tdtcontract = _options.IsTestnet
                ? "0x7cAad48DF199Cd661762485fc44126F4Fe8A58C9"
                : "0x10b66bd1e3b5a936b7f8dbc5976004311037cdf0";
            vmcontract = _options.IsTestnet
                ? "0xC3879Fa416492EDF3a704EE8622A94e4C274c2F5"
                : "0x526c08e5532a9308b3fb33b7968ef78a5005d2ac";
            tbtccontract = _options.IsTestnet
                ? "0x7c07C42973047223F80C4A69Bb62D5195460Eb5F"
                : "0x8daebade922df735c38c80c7ebd708af50815faa";
            tbtcsystem = _options.IsTestnet
                ? "0xc3f96306eDabACEa249D2D22Ec65697f38c6Da69"
                : "0xe20a5c79b39bc8c363f0f49adcfa82c2a01ab64a";
            bondedECDSAKeepFactory = _options.IsTestnet
                ? "0x9eccf03dfbda6a5e50d7aba14e0c60c2f6c575e6"
                : "0xa7d9e842efb252389d613da88eda3731512e40bd";            
            keepBondingContract = _options.IsTestnet
                ? "0x60535A59B4e71F908f3fEB0116F450703FB35eD8"
                : "0x27321f84704a599ab740281e285cc4463d89a3d5";
            ethBtcContract = _options.IsTestnet
                ? "0x80449a756D5aCe9b221E2f7f61d94941f876d18a"
                : "0x81a679f98b63b3ddf2f17cb5619f4d6775b3c5ed";
            tbtctoken = _options.IsTestnet
                ? "0x7c07c42973047223f80c4a69bb62d5195460eb5f"
                : "0x8daebade922df735c38c80c7ebd708af50815faa";
            keepStakingContract = _options.IsTestnet
                ? "0x234d2182b29c6a64ce3ab6940037b5c8fdab608e"
                : "0x1293a54e160d1cd7075487898d65266081a15458";
            tokenGrantContract = _options.IsTestnet
                ? "0xb64649fe00f8ef5187d09d109c6f38f13c7cf857"
                : "0x175989c71fd023d580c65f5dc214002687ff88b7";
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var db = scope.ServiceProvider.GetRequiredService<KeepSpyContext>();
                    var keychain = scope.ServiceProvider.GetRequiredService<KeychainService>();
                    _logger.LogInformation("EthereumWorker loop");
                    try
                    {
                        Run(db, keychain);
                    }
                    catch (Exception e)
                    {
                        _logger.LogError(e, "EthereumWorker failure");
                    }
                }
            }
        }

        uint lastBlock;
        string tdtcontract;
        string vmcontract;
        string tbtccontract;
        string tbtctoken;
        string tbtcsystem;
        string bondedECDSAKeepFactory;
        string keepBondingContract;
        string ethBtcContract;
        string keepStakingContract;
        string tokenGrantContract;

        void Run(KeepSpyContext db, KeychainService keychainService)
        {
            /*
			foreach(var cl in db.Set<ContractLog>().Where(o => o.Amount == null && o.Topic0 == TransferEvent && o.Data != ""))
            {
                cl.Amount = (decimal)BigInteger.Parse(cl.Data, NumberStyles.HexNumber) / 1e18M;
            }
            db.SaveChanges();
            foreach (var t in db.Set<Transaction>().Where(o => o.IsError && o.Error.Length <= 1))
			{
				t.Error = _apiClient.GetTxStatus(t.Id).result.errDescription;
				_logger.LogInformation($"Tx {t.Id} error description: {t.Error}");
			}*/
            //foreach (var d in db.Set<Deposit>().Where(o => o.TokenID.StartsWith("-")))
            //	d.TokenID = System.Numerics.BigInteger.Parse("0" + d.Id.Substring(2), System.Globalization.NumberStyles.HexNumber).ToString();
            //db.SaveChanges();
            var network = db.Set<Network>()
                .SingleOrDefault(n => n.Kind == NetworkKind.Ethereum && n.IsTestnet == _options.IsTestnet);
            if (network == null)
            {
                network = new Network
                {
                    Kind = NetworkKind.Ethereum,
                    IsTestnet = _options.IsTestnet,
                    LastBlock = uint.Parse(_apiClient.GetBlockNumber().result.Substring(2),
                        System.Globalization.NumberStyles.HexNumber),
                    LastBlockAt = DateTime.Now,
                    Id = Guid.NewGuid(),
                    Name = "Ethereum"
                };
                db.Add(network);
                db.SaveChanges();
            }
            if (lastBlock == 0)
            {
                lastBlock = network.LastBlockProcessed ?? (_options.IsTestnet ? 8594983u : 10867766);
                //lastBlock = (db.Set<Transaction>().Where(t => t.Kind == NetworkKind.Ethereum).Max(t => (uint?)t.Block) - 2000) ?? 0;
                //if (lastBlock < 0)
            }

            var contract = db.Set<Contract>().FirstOrDefault(c => c.Active && c.Network == network);
            if (contract == null && !_options.IsTestnet)
            {
                contract = new Contract
                {
                    Active = true,
                    Network = network,
                    Name = "Deposit Factory",
                    Id = "0x87effef56c7ff13e2463b5d4dce81be2340faf8b"
                };
                db.Add(contract);
                db.SaveChanges();
            }

            if (contract == null)
            {
                _logger.LogCritical("No active contract at network {0}", network.Name);
                return;
            }

            var getBlockNumberResult = uint.Parse(_apiClient.GetBlockNumber().result.Substring(2), NumberStyles.HexNumber) - 20;
            var toBlock = getBlockNumberResult;
            if (toBlock < lastBlock)
                lastBlock = toBlock;
            if (toBlock - lastBlock > 1000)
                toBlock = lastBlock + 1000;

            var repo = new Repository(db);
            LoadContractLogs(contract.Id, lastBlock, toBlock, db);
            LoadContractLogs(tdtcontract, lastBlock, toBlock, db);
            LoadContractLogs(vmcontract, lastBlock, toBlock, db);
            LoadContractLogs(tbtccontract, lastBlock, toBlock, db);
            LoadContractLogs(tbtcsystem, lastBlock, toBlock, db);
            LoadContractLogs(bondedECDSAKeepFactory, lastBlock, toBlock, db);
            LoadContractLogs(keepBondingContract, lastBlock, toBlock, db);
            LoadContractLogs(ethBtcContract, lastBlock, toBlock, db);
            LoadContractLogs(tbtctoken, lastBlock, toBlock, db);
            LoadContractLogs(keepStakingContract, _options.IsTestnet ? 8594983u : 10867766, toBlock, db);
            LoadContractLogs(tokenGrantContract, _options.IsTestnet ? 8594983u : 10867766, toBlock, db);

            LoadPriceFeed(db, lastBlock);

            var resultTx = _apiClient.GetAccountTxList(contract.Id, lastBlock, toBlock);
            foreach (var item in resultTx.result)
            {
                if (item.isError == "1")
                    continue;
                if (item.input.StartsWith("0xb7947b40"))
                {
                    var lotSize = uint.Parse(item.input.Substring(66), NumberStyles.HexNumber) / 100000000M;
                    var eventLog = db.Set<ContractLog>().Single(cl => cl.Address == contract.Id && cl.TransactionId == item.hash && cl.Topic0 == DepositCloneCreatedEvent);
                    if (eventLog != null)
                    {
                        var tdt_id = "0x" + eventLog.Data.Substring(24);
                        var deposit = db.Find<Deposit>(tdt_id);
                        if (deposit == null)
                        {
                            deposit = new Deposit
                            {
                                CreatedAt = item.TimeStamp,
                                UpdatedAt = item.TimeStamp,
                                Id = tdt_id,
                                LotSize = lotSize,
                                SenderAddress = item.from,
                                Contract = contract,
                                Status = DepositStatus.InitiatingDeposit,
                                TokenID = System.Numerics.BigInteger.Parse("0" + tdt_id.Substring(2), System.Globalization.NumberStyles.HexNumber).ToString()
                            };
                            db.Add(deposit);
                            AddTx(item, deposit);
                            db.SaveChanges();

                            _logger.LogInformation("TDT {0} created with TokenID: {1}", deposit.Id, deposit.TokenID);
                        }
                    }
                }
            }

            foreach (var log in db.Set<ContractLog>().Where(o => o.Address == tbtcsystem && o.BlockNumber >= lastBlock && o.Topic0 == RegisteredPubKeyEvent && o.BlockNumber <= toBlock).ToList())
            {
                string id = "0x" + log.Topic1.Substring(26);
                var deposit = db.Find<Deposit>(id);
                if (deposit.BitcoinAddress == null)
                {
                    var pubkeyX = log.Data.Substring(0, 64);
                    var pubkeyY = log.Data.Substring(64, 64);

                    var address = keychainService.GetBtcAddress(pubkeyX, pubkeyY, network.IsTestnet);

                    deposit.BitcoinAddress = address;
                    deposit.Status = DepositStatus.WaitingForBtc;
                    deposit.UpdatedAt = log.TimeStamp;
                    _logger.LogInformation("TDT {0} BTC address generated: {1}", deposit.Id, deposit.BitcoinAddress);
                }
                AddLog(log, deposit, DepositStatus.WaitingForBtc);
                db.SaveChanges();
            }

            foreach (var log in db.Set<ContractLog>().Where(o => o.Address == tbtcsystem && o.BlockNumber >= lastBlock && o.Topic0 == SetupFailedEvent && o.BlockNumber <= toBlock).ToList())
            {
                string id = "0x" + log.Topic1.Substring(26);
                var deposit = db.Find<Deposit>(id);
                if (deposit.Status != DepositStatus.SetupFailed)
                {
                    deposit.Status = DepositStatus.SetupFailed;
                    deposit.UpdatedAt = log.TimeStamp;
                    _logger.LogInformation("TDT {0} setup failed", deposit.Id);
                }
                AddLog(log, deposit, DepositStatus.SetupFailed);
                db.SaveChanges();
            }

            foreach (var log in db.Set<ContractLog>().Where(o => o.Address == tbtcsystem && o.BlockNumber >= lastBlock && o.Topic0 == FundedEvent && o.BlockNumber <= toBlock).ToList())
            {
                string id = "0x" + log.Topic1.Substring(26);
                var deposit = db.Find<Deposit>(id);
                if (deposit != null)
                {
                    deposit.EndOfTerm = log.TimeStamp.AddMonths(6);
                    if (deposit.Status <= DepositStatus.BtcReceived)
                    {
                        deposit.Status = DepositStatus.SubmittingProof;
                        deposit.UpdatedAt = log.TimeStamp;
                        _logger.LogInformation("TDT {0} submitted proof", deposit.Id);
                    }

                    AddLog(log, deposit, DepositStatus.SubmittingProof);
                    db.SaveChanges();
                }
            }

            foreach (var log in db.Set<ContractLog>().Where(o => o.Address == tdtcontract && o.BlockNumber >= lastBlock && o.Topic0 == ApprovalEvent && o.BlockNumber <= toBlock).ToList())
            {
                string id = "0x" + log.Topic3.Substring(26);
                if ("0x" + log.Topic2.Substring(26) != vmcontract)
                    continue;
                var deposit = db.Find<Deposit>(id);
                if (deposit == null)
                    continue;
                
                if (deposit.Status == DepositStatus.SubmittingProof)
                {
                    deposit.Status = DepositStatus.ApprovingSpendLimit;
                    deposit.UpdatedAt = log.TimeStamp;
                    _logger.LogInformation("TDT {0} tdt spend approved", deposit.Id);
                }

                AddLog(log, deposit, DepositStatus.ApprovingSpendLimit);
                db.SaveChanges();
            }

            foreach (var logFee in db.Set<ContractLog>().Where(o => o.Address == tbtctoken && o.BlockNumber >= lastBlock && o.Topic0 == TransferEvent && o.Topic1 == "0x0000000000000000000000000000000000000000000000000000000000000000" && o.BlockNumber <= toBlock).ToList())
            {
                string id = "0x" + logFee.Topic2.Substring(26);
                var deposit = db.Find<Deposit>(id);
                if (deposit == null)
                    continue;
                deposit.LotSizeFee = (decimal)(ulong.Parse(logFee.Data.Substring(44), NumberStyles.HexNumber) / 1E18);
                var logMinted = db.Set<ContractLog>().Single(o => o.Address == tbtctoken && o.Topic1 == "0x0000000000000000000000000000000000000000000000000000000000000000" &&
                    o.TransactionId == logFee.TransactionId && o.Topic2 != logFee.Topic2);
                deposit.LotSizeMinted = (decimal)(ulong.Parse(logMinted.Data.Substring(44), NumberStyles.HexNumber) / 1E18);
                deposit.CompletedAt = logMinted.TimeStamp;
                if (deposit.Status != DepositStatus.Closed)
                {
                    deposit.Status = DepositStatus.Minted;
                    deposit.UpdatedAt = logMinted.TimeStamp;
                    _logger.LogInformation("Minted {0} for {1}, fee {2}, TDT ID {3}", deposit.LotSizeMinted,
                        deposit.SenderAddress, deposit.LotSizeFee, deposit.Id);
                }

                AddLog(logMinted, deposit, DepositStatus.Minted);
                db.SaveChanges();
            }

            foreach (var log in db.Set<ContractLog>().Where(o => o.Address == tbtcsystem && o.BlockNumber >= lastBlock && (o.Topic0 == RedemptionRequestedEvent || o.Topic0 == CourtesyCalledEvent) && o.BlockNumber <= toBlock).ToList())
			{
                var tdt_id = "0x" + log.Topic1.Substring(26);
                var deposit = db.Find<Deposit>(tdt_id);
                var redeem = db.Find<Redeem>(tdt_id);
                if (redeem == null)
				{
                    redeem = new Redeem 
                    {
                        Id = tdt_id, 
                        CreatedAt = log.TimeStamp, 
                        SenderAddress = log.Topic0 == RedemptionRequestedEvent ? "0x" + log.Topic2.Substring(26) : "",
                        Deposit = deposit,
                        Status = log.Topic0 == RedemptionRequestedEvent ? RedeemStatus.Requested : RedeemStatus.CourtesyCalled,
                        UpdatedAt = log.TimeStamp
                    };
                    db.Add(redeem);
                }
                deposit.Status = DepositStatus.Closed;
                deposit.UpdatedAt = log.TimeStamp;
                AddLog2(log, redeem, RedeemStatus.Requested);
                _logger.LogInformation("Redeem requested TDT ID {0}", deposit.Id);
                db.SaveChanges();
            }
            
            foreach (var log in db.Set<ContractLog>().Where(o => o.Address == tbtcsystem && o.BlockNumber >= lastBlock && o.Topic0 == GotRedemptionSignatureEvent && o.BlockNumber <= toBlock).ToList())
            {
                string id = "0x" + log.Topic1.Substring(26);
                var redeem = db.Find<Redeem>(id);
                
                if (redeem == null)
                    continue;
                
                if (redeem.Status == RedeemStatus.Requested)
                {
                    redeem.Status = RedeemStatus.Signed;
                    redeem.UpdatedAt = log.TimeStamp;
                    _logger.LogInformation("Redeem {0} signed", redeem.Id);
                }

                AddLog2(log, redeem, RedeemStatus.Signed);
                db.SaveChanges();
            }

            foreach (var log in db.Set<ContractLog>().Where(o => o.Address == tbtcsystem && o.BlockNumber >= lastBlock && o.Topic0 == RedeemedEvent && o.BlockNumber <= toBlock).ToList())
            {
                string id = "0x" + log.Topic1.Substring(26);
                var redeem = db.Find<Redeem>(id);
                if (redeem == null)
                    continue;
                if (redeem.Status != RedeemStatus.Redeemed)
                {
                    redeem.Status = RedeemStatus.Redeemed;
                    redeem.UpdatedAt = log.TimeStamp;
                    redeem.CompletedAt = log.TimeStamp;
                    _logger.LogInformation("Redeem {0} complete", redeem.Id);
                }

                AddLog2(log, redeem, RedeemStatus.Redeemed);
                db.SaveChanges();
            }
            
            foreach (var log in db.Set<ContractLog>().Where(o => o.Address == bondedECDSAKeepFactory && o.BlockNumber >= lastBlock && o.Topic0 == BondedECDSAKeepCreatedEvent && o.BlockNumber <= toBlock).ToList())
            {                
                string id = "0x" + log.Topic2.Substring(26);
                var deposit = db.Find<Deposit>(id);
                if (deposit == null)
                    continue;
                if (deposit.KeepAddress == null)
                {
                    deposit.KeepAddress = "0x" + log.Topic1.Substring(26);
                    var data = Regex.Match(log.Data, "([0-9A-Fa-f]{64})*");
                    deposit.HonestThreshold = (int)ulong.Parse(data.Groups[1].Captures[1].Value, NumberStyles.HexNumber);
                    for (int i = 3; i < data.Groups[1].Captures.Count; i++)
                    {
                        var signerId = "0x" + data.Groups[1].Captures[i].Value.Substring(24);
                        var signer = db.Find<Signer>(signerId);
                        if (signer == null)
						{
                            signer = new Signer { Id = signerId };
                            db.Add(signer);
						}
                        db.Add(new DepositSigner { Deposit = deposit, Signer = signer });
                        _logger.LogInformation("Deposit {0} signer: {1}", deposit.Id, signerId);
                    }
                }
                db.SaveChanges();
            }

            foreach (var log in db.Set<ContractLog>().Where(o => o.Address == keepBondingContract && o.BlockNumber >= lastBlock && o.Topic0 == BondCreatedEvent && o.BlockNumber <= toBlock).ToList())
            {
                var signer = "0x" + log.Topic1.Substring(26);
                var keepAddress = "0x" + log.Topic2.Substring(26);
                var amount = (decimal)System.Numerics.BigInteger.Parse(log.Data.Substring(96, 32), NumberStyles.HexNumber) / 1000000000000000000M;
                if (!db.Set<Bond>().Any(b => b.Deposit.KeepAddress == keepAddress && b.SignerId == signer))
                {
                    var deposit = db.Set<Deposit>().Single(d => d.KeepAddress == keepAddress);
                    db.Add(new Bond { Amount = amount, SignerId = signer, Deposit = deposit });
                    _logger.LogInformation("Deposit {0}, Bond {1} ETH, signer {2}", deposit.Id, amount, signer);
                }
                db.SaveChanges();
            }
            
            foreach (var log in db.Set<ContractLog>().Where(o => o.Address == tbtcsystem && o.BlockNumber >= lastBlock && o.Topic0 == StartedLiquidationEvent && o.BlockNumber <= toBlock).ToList())
            {
                string id = "0x" + log.Topic1.Substring(26);
                var redeem = db.Find<Redeem>(id);
                if (redeem == null)
                    continue;
                if (redeem.Status != RedeemStatus.Liquidation)
                {
                    redeem.Status = RedeemStatus.Liquidation;
                    redeem.UpdatedAt = log.TimeStamp;
                    _logger.LogInformation("Redeem {0} started liquidation", redeem.Id);
                }

                AddLog2(log, redeem, RedeemStatus.Liquidation);
                db.SaveChanges();
            }

            foreach (var log in db.Set<ContractLog>().Where(o => o.Address == tbtcsystem && o.BlockNumber >= lastBlock && o.Topic0 == LiquidatedEvent && o.BlockNumber <= toBlock).ToList())
            {
                string id = "0x" + log.Topic1.Substring(26);
                var redeem = db.Find<Redeem>(id);
                if (redeem == null)
                    continue;
                if (redeem.Status != RedeemStatus.Liquidated)
                {
                    redeem.Status = RedeemStatus.Liquidated;
                    redeem.UpdatedAt = log.TimeStamp;
                    redeem.CompletedAt = log.TimeStamp;
                    _logger.LogInformation("Redeem {0} liquidated", redeem.Id);
                }

                AddLog2(log, redeem, RedeemStatus.Liquidated);
                db.SaveChanges();
            }

            var keepBonding = new KeepBonding(db, lastBlock, toBlock);
            foreach(var deposited in keepBonding.GetUnbondedValueDeposited())
            {
                AddLog(deposited.log);

                var signer = db.Find<Signer>(deposited.@operator);
                if (signer == null)
                {
                    db.Add(new Signer { Id = deposited.@operator });
                    db.SaveChanges();
                }
                var be = db.Find<BondEvent>(deposited.log.LogIndex, deposited.log.TransactionId);
                if (be == null)
                {
                    db.Add(new BondEvent
                    {
                        Amount = deposited.amount,
                        Beneficiary = deposited.beneficiary,
                        TransactionId = deposited.log.TransactionId,
                        LogIndex = deposited.log.LogIndex,
                        SignerId = deposited.@operator,
                        Type = BondEventType.UnbondedValueDeposited
                    });
                    db.SaveChanges();
                }
			}
            foreach (var withdrawn in keepBonding.GetUnbondedValueWithdrawn())
            {
                AddLog(withdrawn.log);

                var signer = db.Find<Signer>(withdrawn.@operator);
                if (signer == null)
                {
                    db.Add(new Signer { Id = withdrawn.@operator });
                    db.SaveChanges();
                }

                var be = db.Find<BondEvent>(withdrawn.log.LogIndex, withdrawn.log.TransactionId);
                if (be == null)
                {
                    db.Add(new BondEvent
                    {
                        Amount = -withdrawn.amount,
                        Beneficiary = withdrawn.beneficiary,
                        TransactionId = withdrawn.log.TransactionId,
                        LogIndex = withdrawn.log.LogIndex,
                        SignerId = withdrawn.@operator,
                        Type = BondEventType.UnbondedValueWithdrawn
                    });
                    db.SaveChanges();
                }
            }
            foreach (var bondCreated in keepBonding.GetBondCreated())
            {
                var deposit = db.Set<Deposit>().SingleOrDefault(d => d.KeepAddress == bondCreated.holder);
                if (deposit == null)
                    continue;
                AddLog(bondCreated.log);

                var signer = db.Find<Signer>(bondCreated.@operator);
                if (signer == null)
                {
                    db.Add(new Signer { Id = bondCreated.@operator });
                    db.SaveChanges();
                }

                var be = db.Find<BondEvent>(bondCreated.log.LogIndex, bondCreated.log.TransactionId);
                if (be == null)
                {
                    db.Add(new BondEvent
                    {
                        Amount = bondCreated.amount,
                        ReferenceID = bondCreated.referenceID,
                        DepositId = deposit.Id,
                        TransactionId = bondCreated.log.TransactionId,
                        LogIndex = bondCreated.log.LogIndex,
                        SignerId = bondCreated.@operator,
                        Type = BondEventType.BondCreated
                    });
                    db.SaveChanges();
                }
            }
            foreach (var bondReleased in keepBonding.GetBondReleased())
            {
                var bondCreated = db.Set<BondEvent>().SingleOrDefault(b => b.ReferenceID == bondReleased.referenceID && b.Type == BondEventType.BondCreated && b.SignerId == bondReleased.@operator);
                if (bondCreated == null)
                    continue;
                AddLog(bondReleased.log);
                if (!bondCreated.Released)
                {
                    bondCreated.Released = true;
                    db.SaveChanges();
                }

                var be = db.Find<BondEvent>(bondReleased.log.LogIndex, bondReleased.log.TransactionId);
                if (be == null)
                {
                    db.Add(new BondEvent
                    {
                        Amount = -bondCreated.Amount,
                        ReferenceID = bondReleased.referenceID,
                        DepositId = bondCreated.DepositId,
                        TransactionId = bondReleased.log.TransactionId,
                        LogIndex = bondReleased.log.LogIndex,
                        SignerId = bondReleased.@operator,
                        Type = BondEventType.BondReleased
                    });
                    db.SaveChanges();
                }
            }
            foreach (var bondSeized in keepBonding.GetBondSeized())
            {
                var bondCreated = db.Set<BondEvent>().SingleOrDefault(b => b.ReferenceID == bondSeized.referenceID && b.Type == BondEventType.BondCreated && b.SignerId == bondSeized.@operator);
                if (bondCreated == null)
                    continue;
                AddLog(bondSeized.log);
                if (!bondCreated.Released)
                {
                    bondCreated.Released = true;
                    db.SaveChanges();
                }

                var be = db.Find<BondEvent>(bondSeized.log.LogIndex, bondSeized.log.TransactionId);
                if (be == null)
                {
                    db.Add(new BondEvent
                    {
                        Amount = -bondCreated.Amount,
                        ReferenceID = bondSeized.referenceID,
                        DepositId = bondCreated.DepositId,
                        TransactionId = bondSeized.log.TransactionId,
                        LogIndex = bondSeized.log.LogIndex,
                        SignerId = bondSeized.@operator,
                        Type = BondEventType.BondSeized
                    });
                    db.SaveChanges();
                }
            }

            var tokenStaking = new TokenStaking(db, lastBlock, toBlock);
            foreach (var item in tokenStaking.GetTokenGrantStaked())
            {
                AddLog(item.log);

                var signer = db.Find<Signer>(item.@operator);
                if (signer == null)
                {
                    db.Add(new Signer { Id = item.@operator });
                    db.SaveChanges();
                }
                var se = db.Find<StakeEvent>(item.log.LogIndex, item.log.TransactionId);
                if (se == null)
                {
                    db.Add(new StakeEvent
                    {
                        TransactionId = item.log.TransactionId,
                        LogIndex = item.log.LogIndex,
                        SignerId = item.@operator,
                        Type = StakeEventType.TokenGrantStaked
                    });
                    db.SaveChanges();
                }
            }
            foreach (var item in tokenStaking.GetStakeDelegated())
            {
                AddLog(item.log);

                var signer = db.Find<Signer>(item.@operator);
                if (signer == null)
                {
                    db.Add(new Signer { Id = item.@operator });
                    db.SaveChanges();
                }
                var se = db.Find<StakeEvent>(item.log.LogIndex, item.log.TransactionId);
                if (se == null)
                {
                    db.Add(new StakeEvent
                    {
                        TransactionId = item.log.TransactionId,
                        LogIndex = item.log.LogIndex,
                        SignerId = item.@operator,
                        Type = StakeEventType.StakeDelegated
                    });
                    db.SaveChanges();
                }
            }
            foreach (var item in tokenStaking.GetOperatorStaked())
            {
                AddLog(item.log);

                var signer = db.Find<Signer>(item.@operator);
                if (signer == null)
                {
                    db.Add(new Signer { Id = item.@operator });
                    db.SaveChanges();
                }
                var se = db.Find<StakeEvent>(item.log.LogIndex, item.log.TransactionId);
                if (se == null)
                {
                    db.Add(new StakeEvent
                    {
                        TransactionId = item.log.TransactionId,
                        LogIndex = item.log.LogIndex,
                        SignerId = item.@operator,
                        Type = StakeEventType.OperatorStaked,
                        Amount = item.amount
                    });
                    db.SaveChanges();
                }
            }
            foreach (var item in tokenStaking.GetTopUpInitiated())
            {
                AddLog(item.log);

                var signer = db.Find<Signer>(item.@operator);
                if (signer == null)
                {
                    db.Add(new Signer { Id = item.@operator });
                    db.SaveChanges();
                }
                var se = db.Find<StakeEvent>(item.log.LogIndex, item.log.TransactionId);
                if (se == null)
                {
                    db.Add(new StakeEvent
                    {
                        TransactionId = item.log.TransactionId,
                        LogIndex = item.log.LogIndex,
                        SignerId = item.@operator,
                        Type = StakeEventType.TopUpInitiated,
                        Amount = item.amount
                    });
                    db.SaveChanges();
                }
            }
            foreach (var item in tokenStaking.GetTopUpCompleted())
            {
                AddLog(item.log);

                var signer = db.Find<Signer>(item.@operator);
                if (signer == null)
                {
                    db.Add(new Signer { Id = item.@operator });
                    db.SaveChanges();
                }
                var se = db.Find<StakeEvent>(item.log.LogIndex, item.log.TransactionId);
                if (se == null)
                {
                    db.Add(new StakeEvent
                    {
                        TransactionId = item.log.TransactionId,
                        LogIndex = item.log.LogIndex,
                        SignerId = item.@operator,
                        Type = StakeEventType.TopUpCompleted,
                        Amount = item.amount
                    });
                    db.SaveChanges();
                }
            }
            foreach (var item in tokenStaking.GetUndelegated())
            {
                AddLog(item.log);

                var signer = db.Find<Signer>(item.@operator);
                if (signer == null)
                {
                    db.Add(new Signer { Id = item.@operator });
                    db.SaveChanges();
                }
                var se = db.Find<StakeEvent>(item.log.LogIndex, item.log.TransactionId);
                if (se == null)
                {
                    db.Add(new StakeEvent
                    {
                        TransactionId = item.log.TransactionId,
                        LogIndex = item.log.LogIndex,
                        SignerId = item.@operator,
                        Type = StakeEventType.Undelegated
                    });
                    db.SaveChanges();
                }
            }
            foreach (var item in tokenStaking.GetRecoveredStake())
            {
                AddLog(item.log);

                var signer = db.Find<Signer>(item.@operator);
                if (signer == null)
                {
                    db.Add(new Signer { Id = item.@operator });
                    db.SaveChanges();
                }
                var se = db.Find<StakeEvent>(item.log.LogIndex, item.log.TransactionId);
                if (se == null)
                {
                    db.Add(new StakeEvent
                    {
                        TransactionId = item.log.TransactionId,
                        LogIndex = item.log.LogIndex,
                        SignerId = item.@operator,
                        Type = StakeEventType.RecoveredStake
                    });
                    db.SaveChanges();
                }
            }
            foreach (var item in tokenStaking.GetTokensSeized())
            {
                AddLog(item.log);

                var signer = db.Find<Signer>(item.@operator);
                if (signer == null)
                {
                    db.Add(new Signer { Id = item.@operator });
                    db.SaveChanges();
                }
                var se = db.Find<StakeEvent>(item.log.LogIndex, item.log.TransactionId);
                if (se == null)
                {
                    db.Add(new StakeEvent
                    {
                        TransactionId = item.log.TransactionId,
                        LogIndex = item.log.LogIndex,
                        SignerId = item.@operator,
                        Type = StakeEventType.TokensSeized,
                        Amount = -item.amount
                    });
                    db.SaveChanges();
                }
            }
            /*foreach (var item in tokenStaking.GetStakeLocked())
            {
                AddLog(item.log);

                var signer = db.Find<Signer>(item.@operator);
                if (signer == null)
                {
                    db.Add(new Signer { Id = item.@operator });
                    db.SaveChanges();
                }
                var se = db.Find<StakeEvent>(item.log.LogIndex, item.log.TransactionId);
                if (se == null)
                {
                    db.Add(new StakeEvent
                    {
                        TransactionId = item.log.TransactionId,
                        LogIndex = item.log.LogIndex,
                        SignerId = item.@operator,
                        Type = StakeEventType.StakeLocked,
                        DepositId = db.Set<Deposit>().Where(d => d.KeepAddress == item.lockCreator).FirstOrDefault()?.Id
                    });
                    db.SaveChanges();
                }
            }
            foreach (var item in tokenStaking.GetLockReleased())
            {
                AddLog(item.log);

                var signer = db.Find<Signer>(item.@operator);
                if (signer == null)
                {
                    db.Add(new Signer { Id = item.@operator });
                    db.SaveChanges();
                }
                var se = db.Find<StakeEvent>(item.log.LogIndex, item.log.TransactionId);
                if (se == null)
                {
                    db.Add(new StakeEvent
                    {
                        TransactionId = item.log.TransactionId,
                        LogIndex = item.log.LogIndex,
                        SignerId = item.@operator,
                        Type = StakeEventType.LockReleased,
                        DepositId = db.Set<Deposit>().Where(d => d.KeepAddress == item.lockCreator).FirstOrDefault()?.Id
                    });
                    db.SaveChanges();
                }
            }
            */
            var bn = uint.MaxValue;
            if (resultTx.result.Count > 100)
                bn = Math.Min(bn, resultTx.result.Max(o => uint.Parse(o.blockNumber)));
            
            if (bn < uint.MaxValue)
                lastBlock = bn;
            else
                lastBlock = toBlock;
            network.LastBlockProcessed = lastBlock;
            if (network.LastBlock != getBlockNumberResult)
            {
                network.LastBlock = getBlockNumberResult;
                network.LastBlockAt = DateTime.Now;
            }

            db.SaveChanges();
            _logger.LogWarning($"Last block processed: {lastBlock}/{getBlockNumberResult}");

            if (getBlockNumberResult == lastBlock)
                Thread.Sleep(_options.Interval * 1000);

            void AddTx(Etherscan.Tx tx, Deposit d)
            {
                if (db.Find<Transaction>(tx.hash) == null)
                {
                    string tx_error = "";
                    if (tx.isError == "1")
                        tx_error = _apiClient.GetTxStatus(tx.hash).result.errDescription;
                    db.Add(new Transaction
                    {
                        Id = tx.hash,
                        Deposit = d,
                        Block = uint.Parse(tx.blockNumber),
                        Status = d.Status,
                        IsError = tx.isError == "1",
                        Error = tx_error,
                        Timestamp = tx.TimeStamp,
                        Amount = decimal.Parse(tx.value) / 1000000000000000000,
                        Fee = decimal.Parse(tx.gasPrice) / 1000000000000000000 * decimal.Parse(tx.gasUsed),
                        Kind = network.Kind,
                        Sender = tx.from,
                        Recipient = tx.to
                    });
                    db.SaveChanges();
                    _logger.LogInformation($"Saved tx {tx.hash} ({tx.TimeStamp})");
                }
            }

            void AddLog(ContractLog log, Deposit? d = null, DepositStatus? s = null)
            {
                if (db.Find<Transaction>(log.TransactionId) == null)
                {
                    db.Add(new Transaction
                    {
                        Id = log.TransactionId,
                        Deposit = d,
                        Block = log.BlockNumber,
                        Status = s,
                        Timestamp = log.TimeStamp,
                        Error = "",
                        Fee = log.Fee,
                        Kind = network.Kind
                    });
                    db.SaveChanges();
                    _logger.LogInformation($"Saved tx {log.TransactionId} ({log.TimeStamp})");
                }
            }

            void AddLog2(ContractLog log, Redeem r, RedeemStatus s)
            {
                if (db.Find<Transaction>(log.TransactionId) == null)
                {
                    db.Add(new Transaction
                    {
                        Id = log.TransactionId,
                        Redeem = r,
                        Block = log.BlockNumber,
                        Status = DepositStatus.Closed,
                        RedeemStatus = s,
                        Timestamp = log.TimeStamp,
                        Error = "",
                        Fee = log.Fee,
                        Kind = network.Kind
                    });
                    db.SaveChanges();
                    _logger.LogInformation($"Saved tx {log.TransactionId} ({log.TimeStamp})");
                }
            }
        }

        void LoadContractLogs(string address, uint startBlock, uint toBlock, KeepSpyContext db)
		{
            Repository repo = new Repository(db);
            uint fromBlock = startBlock;
            if (db.Set<ContractLog>().Count(o => o.Address == address) > 0)
                fromBlock = db.Set<ContractLog>().Where(o => o.Address == address).Max(o => o.BlockNumber);
            if (fromBlock > toBlock)
                return;
            var cl = new ContractLogs(_apiClient, address, fromBlock, toBlock);
            while(!cl.Finished)
			{
                var logs = cl.GetNextLogs();
                foreach (var log in logs)
                    repo.AddLog(log);
                _logger.LogInformation($"Stored {logs.Count} for {address}");
			};
		}

        void LoadPriceFeed(KeepSpyContext db, uint startBlock) 
        {
            const string LogMedianPriceEvent = "0xb78ebc573f1f889ca9e1e0fb62c843c836f3d3a2e1f43ef62940e9b894f4ea4c";
            foreach (var log in db.Set<ContractLog>().Where(cl => cl.Address == ethBtcContract && cl.Topic0 == LogMedianPriceEvent && cl.BlockNumber >= startBlock).ToList())
            {
                if (db.Find<CurrencyRate>(log.TimeStamp, TradePair.ETHBTC, CurrencyRateSource.MedianETHBTC) == null)
                {
                    var value = (decimal)System.Numerics.BigInteger.Parse(log.Data.Substring(32, 32), System.Globalization.NumberStyles.HexNumber) / 1000000000000000000M;
                    db.Add(new CurrencyRate
                    {
                        Timestamp = log.TimeStamp,
                        TradePair = TradePair.ETHBTC,
                        Source = CurrencyRateSource.MedianETHBTC,
                        Value = value
                    });
                    db.SaveChanges();
                }
            }
        }
    }

    public class EthereumWorkerOptions
    {
        public string ApiUrl { get; set; }
        public int Interval { get; set; }
        public bool IsTestnet { get; set; }
    }
}