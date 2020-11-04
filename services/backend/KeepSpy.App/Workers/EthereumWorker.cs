using System;
using System.Linq;
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
            await Task.Delay(5000, stoppingToken);
            tdtcontract = _options.IsTestnet
                ? "0x7cAad48DF199Cd661762485fc44126F4Fe8A58C9"
                : "0x10B66Bd1e3b5a936B7f8Dbc5976004311037Cdf0";
            vmcontract = _options.IsTestnet
                ? "0xC3879Fa416492EDF3a704EE8622A94e4C274c2F5"
                : "0x526c08E5532A9308b3fb33b7968eF78a5005d2AC";
            tbtccontract = _options.IsTestnet
                ? "0x7c07C42973047223F80C4A69Bb62D5195460Eb5F"
                : "0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa";
            tbtcsystem = _options.IsTestnet
                ? "0xc3f96306eDabACEa249D2D22Ec65697f38c6Da69"
                : "0xe20A5C79b39bC8C363f0f49ADcFa82C2a01ab64a";
            bondedECDSAKeepFactory = _options.IsTestnet
                ? "0x9eccf03dfbda6a5e50d7aba14e0c60c2f6c575e6"
                : "0xA7d9E842EFB252389d613dA88EDa3731512e40bD";            
            keepBondingContract = _options.IsTestnet
                ? "0x60535A59B4e71F908f3fEB0116F450703FB35eD8"
                : "0x27321f84704a599aB740281E285cc4463d89A3D5";
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var db = scope.ServiceProvider.GetRequiredService<KeepSpyContext>();
                    var keychain = scope.ServiceProvider.GetRequiredService<KeychainService>();
                    _logger.LogInformation("EthereumWorker loop");
                    try
                    {
                        if (lastBlock == 0)
                        {
                            lastBlock = (db.Set<Transaction>().Where(t => t.Kind == NetworkKind.Ethereum).Max(t => (uint?)t.Block) - 2000) ?? 0;
                            if (lastBlock < 0)
                                lastBlock = _options.IsTestnet ? 8594983u : 10867766;
                        }
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
        string tbtcsystem;
        string bondedECDSAKeepFactory;
        string keepBondingContract;

        void Run(KeepSpyContext db, KeychainService keychainService)
        {
            /*
			foreach (var t in db.Set<Transaction>().Where(o => o.IsError && o.Error.Length <= 1))
			{
				t.Error = _apiClient.GetTxStatus(t.Id).result.errDescription;
				_logger.LogInformation($"Tx {t.Id} error description: {t.Error}");
			}*/
			foreach (var d in db.Set<Deposit>().Where(o => o.TokenID.StartsWith("-")))
				d.TokenID = System.Numerics.BigInteger.Parse("0" + d.Id.Substring(2), System.Globalization.NumberStyles.HexNumber).ToString();
			db.SaveChanges();
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

            var getBlockNumberResult = uint.Parse(_apiClient.GetBlockNumber().result.Substring(2),
                System.Globalization.NumberStyles.HexNumber);
            uint toBlock = getBlockNumberResult - lastBlock > 200 ? lastBlock + 200 : getBlockNumberResult;
            var resultTx = _apiClient.GetAccountTxList(contract.Id, lastBlock + 1, toBlock);
            var resultLogs = _apiClient.GetLogs(contract.Id, lastBlock + 1, toBlock);
            //var tdtTransferLogs = _apiClient.GetLogs(tdtcontract, lastBlock, lastBlock + delta, topic0: TransferEvent);
            var regpubKeyLogs = _apiClient.GetLogs(null, lastBlock + 1, toBlock, topic0: RegisteredPubKeyEvent);
            var setupFailLogs = _apiClient.GetLogs(tbtcsystem, lastBlock + 1, toBlock, topic0: SetupFailedEvent);
            var fundedLogs = _apiClient.GetLogs(null, lastBlock + 1, toBlock, topic0: FundedEvent);
            var approvalLogs = _apiClient.GetLogs(tdtcontract, lastBlock + 1, toBlock, topic0: ApprovalEvent);
            var tdt2btcTx = _apiClient.GetAccountTxList(vmcontract, lastBlock + 1, toBlock);

            var contracts = new Ethereum.EthContracts(_apiClient, network.IsTestnet, lastBlock);

            foreach(var item in contracts.GetEthBtc())
			{
                if (db.Find<CurrencyRate>(item.timeStamp, TradePair.ETHBTC, CurrencyRateSource.MedianETHBTC) == null)
                    db.Add(new CurrencyRate 
                    {
                        Timestamp = item.timeStamp, 
                        TradePair = TradePair.ETHBTC,
                        Source = CurrencyRateSource.MedianETHBTC, 
                        Value = item.ethPrice 
                    });
			}
            db.SaveChanges();
            foreach (var item in resultTx.result)
            {
                if (item.input.StartsWith("0xb7947b40"))
                {
                    var lotSize = uint.Parse(item.input.Substring(66), System.Globalization.NumberStyles.HexNumber) /
                                  100000000M;
                    var eventLog = resultLogs.result.FirstOrDefault(o => o.transactionHash == item.hash);
                    if (eventLog != null)
                    {
                        var tdt_id = "0x" + eventLog.data.Substring(26);
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
                            _logger.LogInformation("TDT {0} created with TokenID: {1}", deposit.Id, deposit.TokenID);
                        }
                    }
                }
            }

            db.SaveChanges();
            foreach (var pubKey in regpubKeyLogs.result)
            {
                string id = "0x" + pubKey.topics[1].Substring(26);
                var deposit = db.Find<Deposit>(id);
                if (deposit != null && deposit.Status == DepositStatus.InitiatingDeposit)
                {
                    var pubkeyX = pubKey.data.Substring(2, 64);
                    var pubkeyY = pubKey.data.Substring(66, 64);

                    var address = keychainService.GetBtcAddress(pubkeyX, pubkeyY, network.IsTestnet);

                    deposit.BitcoinAddress = address;
                    deposit.Status = DepositStatus.WaitingForBtc;
                    deposit.UpdatedAt = pubKey.TimeStamp;
                    _logger.LogInformation("TDT {0} BTC address generated: {1}", deposit.Id, deposit.BitcoinAddress);
                }

                if (deposit != null)
                    AddLog(pubKey, deposit, DepositStatus.WaitingForBtc);
            }

            db.SaveChanges();
            foreach (var setupFail in setupFailLogs.result)
            {
                string id = "0x" + setupFail.topics[1].Substring(26);
                var deposit = db.Find<Deposit>(id);
                if (deposit != null && deposit.Status != DepositStatus.SetupFailed)
                {
                    deposit.Status = DepositStatus.SetupFailed;
                    deposit.UpdatedAt = setupFail.TimeStamp;
                    _logger.LogInformation("TDT {0} setup failed", deposit.Id);
                }

                if (deposit != null)
                    AddLog(setupFail, deposit, DepositStatus.SetupFailed);
            }

            db.SaveChanges();
            foreach (var funded in fundedLogs.result)
            {
                string id = "0x" + funded.topics[1].Substring(26);
                var deposit = db.Find<Deposit>(id);
                if (deposit != null && deposit.Status <= DepositStatus.BtcReceived)
                {
                    deposit.Status = DepositStatus.SubmittingProof;
                    deposit.UpdatedAt = funded.TimeStamp;
                    deposit.EndOfTerm = funded.TimeStamp.AddMonths(6);
                    _logger.LogInformation("TDT {0} submitted proof", deposit.Id);
                }

                if (deposit != null)
                    AddLog(funded, deposit, DepositStatus.SubmittingProof);
            }

            db.SaveChanges();
            foreach (var approval in approvalLogs.result)
            {
                if (approval.topics.Count != 4)
                    continue;
                string id = "0x" + approval.topics[3].Substring(26);
                if (approval.topics[2] == approval.topics[3])
                    continue;
                var deposit = db.Set<Deposit>().SingleOrDefault(o => o.Id == id);                
                if (deposit != null && deposit.Status == DepositStatus.SubmittingProof)
                {
                    deposit.Status = DepositStatus.ApprovingSpendLimit;
                    deposit.UpdatedAt = approval.TimeStamp;
                    _logger.LogInformation("TDT {0} tdt spend approved", deposit.Id);
                }

                if (deposit != null)
                    AddLog(approval, deposit, DepositStatus.ApprovingSpendLimit);
            }

            db.SaveChanges();
            foreach (var vmTx in tdt2btcTx.result)
            {
                if (vmTx.input.StartsWith("0xba2238d0"))
                {
                    var tdt_id = "0x" + vmTx.input.Substring(34);
                    var deposit = db.Find<Deposit>(tdt_id);
                    if (deposit != null && deposit.Status < DepositStatus.Minted)
                    {
                        if (vmTx.isError == "0")
                        {
                            var tbtcTransferLogs = _apiClient.GetLogs(tbtccontract, ulong.Parse(vmTx.blockNumber),
                                ulong.Parse(vmTx.blockNumber), topic0: TransferEvent);
                            if (tbtcTransferLogs.status == "1")
                            {
                                var res = tbtcTransferLogs.result.Where(o => o.transactionHash == vmTx.hash).ToList();
                                if (res.Count != 2)
                                {
                                    _logger.LogWarning("Tx: {0}", vmTx.hash);
                                    continue;
                                }

                                deposit.LotSizeMinted = (decimal) (ulong.Parse(res[0].data.Substring(46),
                                    System.Globalization.NumberStyles.HexNumber) / 1E18);
                                deposit.LotSizeFee = (decimal) (ulong.Parse(res[1].data.Substring(46),
                                    System.Globalization.NumberStyles.HexNumber) / 1E18);
                                deposit.CompletedAt = vmTx.TimeStamp;
                                deposit.UpdatedAt = vmTx.TimeStamp;
                                deposit.Status = DepositStatus.Minted;
                                _logger.LogInformation("Minted {0} for {1}, fee {2}, TDT ID {3}", deposit.LotSizeMinted,
                                    deposit.SenderAddress, deposit.LotSizeFee, deposit.Id);
                            }
                        }
                    }

                    if (deposit != null)
                        AddTx(vmTx, deposit);
                }

                if (vmTx.input.StartsWith("0xbe138da7")) //tbtcToBtc
                {
                    var tdt_id = "0x" + vmTx.input.Substring(34, 40);
                    var deposit = db.Find<Deposit>(tdt_id);
                    var redeem = db.Find<Redeem>(tdt_id) ?? new Redeem { Id = tdt_id, CreatedAt = vmTx.TimeStamp, SenderAddress = vmTx.from, Deposit = deposit, Status = vmTx.isError == "1" ? RedeemStatus.OperationFailed : RedeemStatus.Requested, UpdatedAt = vmTx.TimeStamp };
                    if (deposit != null)
                    {
                        if (vmTx.isError != "1")
                        {
                            redeem.CreatedAt = vmTx.TimeStamp;
                            redeem.SenderAddress = vmTx.from;
                            redeem.Status = vmTx.isError == "1" ? RedeemStatus.OperationFailed : RedeemStatus.Requested;
                            redeem.UpdatedAt = vmTx.TimeStamp;
                        };
                        if (!db.Set<Redeem>().Local.Any(e => e == redeem))
                            db.Add(redeem);
                        if (vmTx.isError != "1")
                        {
                            deposit.Status = DepositStatus.Closed;
                            deposit.UpdatedAt = vmTx.TimeStamp;
                            _logger.LogInformation("Redeem requested TDT ID {0}", deposit.Id);
                        }
                        else
                            _logger.LogInformation("Redeem request failed TDT ID {0}", deposit.Id);
                        AddTx2(vmTx, redeem);
                    }
                }
            }

            db.SaveChanges();
            var gotRedemtionSignatureLogs = _apiClient.GetLogs(tbtcsystem, lastBlock + 1, toBlock,
                topic0: GotRedemptionSignatureEvent);
            foreach (var gotRedemtion in gotRedemtionSignatureLogs.result)
            {
                if (gotRedemtion.topics.Count != 3)
                    continue;
                string id = "0x" + gotRedemtion.topics[1].Substring(26);
                var redeem = db.Find<Redeem>(id);
                if (redeem != null && redeem.Status == RedeemStatus.Requested)
                {
                    redeem.Status = RedeemStatus.Signed;
                    redeem.UpdatedAt = gotRedemtion.TimeStamp;
                    _logger.LogInformation("Redeem {0} signed", redeem.Id);
                }

                if (redeem != null)
                    AddLog2(gotRedemtion, redeem, RedeemStatus.Signed);
            }

            db.SaveChanges();
            var redeemedLogs = _apiClient.GetLogs(tbtcsystem, lastBlock + 1, toBlock, topic0: RedeemedEvent);
            foreach (var redeemed in redeemedLogs.result)
            {
                if (redeemed.topics.Count != 3)
                    continue;
                string id = "0x" + redeemed.topics[1].Substring(26);
                var redeem = db.Find<Redeem>(id);
                if (redeem != null && redeem.Status != RedeemStatus.Redeemed)
                {
                    redeem.Status = RedeemStatus.Redeemed;
                    redeem.UpdatedAt = redeemed.TimeStamp;
                    redeem.CompletedAt = redeemed.TimeStamp;
                    _logger.LogInformation("Redeem {0} complete", redeem.Id);
                }

                if (redeem != null)
                    AddLog2(redeemed, redeem, RedeemStatus.Redeemed);
            }
            var keepCreatedLogs = _apiClient.GetLogs(bondedECDSAKeepFactory, lastBlock + 1, toBlock, topic0: BondedECDSAKeepCreatedEvent);
            foreach(var keep in keepCreatedLogs.result)
			{
                if (keep.topics.Count != 4)
                    continue;

                string id = "0x" + keep.topics[2].Substring(26);
                var deposit = db.Find<Deposit>(id);
                if (deposit.KeepAddress == null)
                {
                    deposit.KeepAddress = "0x" + keep.topics[1].Substring(26);
                    var data = Regex.Match(keep.data, "0x([0-9A-Fa-f]{64})*");
                    deposit.HonestThreshold = (int)ulong.Parse(data.Groups[1].Captures[1].Value, System.Globalization.NumberStyles.HexNumber);
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
            }
            db.SaveChanges();
            foreach (var item in _apiClient.GetLogs(keepBondingContract, lastBlock + 1, toBlock, topic0: BondCreatedEvent).result)
			{
                var signer = "0x" + item.topics[1].Substring(26);
                var keepAddress = "0x" + item.topics[2].Substring(26);
                var amount = (decimal)System.Numerics.BigInteger.Parse(item.data.Substring(98, 32), System.Globalization.NumberStyles.HexNumber) / 1000000000000000000M;
                if (!db.Set<Bond>().Any(b => b.Deposit.KeepAddress == keepAddress && b.SignerId == signer))
                {
                    var deposit = db.Set<Deposit>().Single(d => d.KeepAddress == keepAddress);
                    db.Add(new Bond { Amount = amount, SignerId = signer, Deposit = deposit });
                    _logger.LogInformation("Deposit {0}, Bond {1} ETH, signer {2}", deposit.Id, amount, signer);
                }
            }

            db.SaveChanges();
            var startedLiquidaionLogs =
                _apiClient.GetLogs(tbtcsystem, lastBlock + 1, toBlock, topic0: StartedLiquidationEvent);
            foreach (var startedLiquidaion in startedLiquidaionLogs.result)
            {
                if (startedLiquidaion.topics.Count != 2)
                    continue;
                string id = "0x" + startedLiquidaion.topics[1].Substring(26);
                var redeem = db.Find<Redeem>(id);
                if (redeem != null && redeem.Status != RedeemStatus.Liquidation)
                {
                    redeem.Status = RedeemStatus.Liquidation;
                    redeem.UpdatedAt = startedLiquidaion.TimeStamp;
                    _logger.LogInformation("Redeem {0} started liquidation", redeem.Id);
                }

                if (redeem != null)
                    AddLog2(startedLiquidaion, redeem, RedeemStatus.Liquidation);
            }

            db.SaveChanges();
            var liquidatedLogs = _apiClient.GetLogs(tbtcsystem, lastBlock + 1, toBlock, topic0: LiquidatedEvent);
            foreach (var liquidated in liquidatedLogs.result)
            {
                if (liquidated.topics.Count != 2)
                    continue;
                string id = "0x" + liquidated.topics[1].Substring(26);
                var redeem = db.Find<Redeem>(id);
                if (redeem != null && redeem.Status != RedeemStatus.Liquidated)
                {
                    redeem.Status = RedeemStatus.Liquidated;
                    redeem.UpdatedAt = liquidated.TimeStamp;
                    redeem.CompletedAt = liquidated.TimeStamp;
                    _logger.LogInformation("Redeem {0} liquidated", redeem.Id);
                }

                if (redeem != null)
                    AddLog2(liquidated, redeem, RedeemStatus.Liquidated);
            }

            var keepBonding = new KeepBonding(_apiClient, network.IsTestnet, lastBlock + 1, toBlock);
            foreach(var deposited in keepBonding.GetUnbondedValueDeposited())
            {
                AddLog(deposited.log);

                var signer = db.Find<Signer>(deposited.@operator);
                if (signer == null)
				    db.Add(new Signer { Id = deposited.@operator });

                var be = db.Find<BondEvent>(deposited.log.logIndex, deposited.log.transactionHash);
                if (be == null)
                    db.Add(new BondEvent
                    {
                        Amount = deposited.amount,
                        Beneficiary = deposited.beneficiary,
                        TransactionId = deposited.log.transactionHash,
                        LogIndex = deposited.log.logIndex,
                        SignerId = deposited.@operator,
                        Type = BondEventType.UnbondedValueDeposited
                    });

                db.SaveChanges();
			}
            foreach (var withdrawn in keepBonding.GetUnbondedValueWithdrawn())
            {
                AddLog(withdrawn.log);

                var signer = db.Find<Signer>(withdrawn.@operator);
                if (signer == null)
                    db.Add(new Signer { Id = withdrawn.@operator });

                var be = db.Find<BondEvent>(withdrawn.log.logIndex, withdrawn.log.transactionHash);
                if (be == null)
                    db.Add(new BondEvent
                    {
                        Amount = -withdrawn.amount,
                        Beneficiary = withdrawn.beneficiary,
                        TransactionId = withdrawn.log.transactionHash,
                        LogIndex = withdrawn.log.logIndex,
                        SignerId = withdrawn.@operator,
                        Type = BondEventType.UnbondedValueWithdrawn
                    });

                db.SaveChanges();
            }
            foreach (var bondCreated in keepBonding.GetBondCreated())
            {
                var deposit = db.Set<Deposit>().SingleOrDefault(d => d.KeepAddress == bondCreated.holder);
                if (deposit == null)
                    continue;
                AddLog(bondCreated.log);

                var signer = db.Find<Signer>(bondCreated.@operator);
                if (signer == null)
                    db.Add(new Signer { Id = bondCreated.@operator });

                var be = db.Find<BondEvent>(bondCreated.log.logIndex, bondCreated.log.transactionHash);
                if (be == null)
                    db.Add(new BondEvent
                    {
                        Amount = bondCreated.amount,
                        ReferenceID = bondCreated.referenceID,
                        DepositId = deposit.Id,
                        TransactionId = bondCreated.log.transactionHash,
                        LogIndex = bondCreated.log.logIndex,
                        SignerId = bondCreated.@operator,
                        Type = BondEventType.BondCreated
                    });

                db.SaveChanges();
            }
            foreach (var bondReleased in keepBonding.GetBondReleased())
            {
                var bondCreated = db.Set<BondEvent>().SingleOrDefault(b => b.ReferenceID == bondReleased.referenceID && b.Type == BondEventType.BondCreated && b.SignerId == bondReleased.@operator);
                if (bondCreated == null)
                    continue;
                AddLog(bondReleased.log);
                bondCreated.Released = true;

                var be = db.Find<BondEvent>(bondReleased.log.logIndex, bondReleased.log.transactionHash);
                if (be == null)
                    db.Add(new BondEvent
                    {
                        Amount = -bondCreated.Amount,
                        ReferenceID = bondReleased.referenceID,
                        DepositId = bondCreated.DepositId,
                        TransactionId = bondReleased.log.transactionHash,
                        LogIndex = bondReleased.log.logIndex,
                        SignerId = bondReleased.@operator,
                        Type = BondEventType.BondReleased
                    });

                db.SaveChanges();
            }
            foreach (var bondSeized in keepBonding.GetBondSeized())
            {
                var bondCreated = db.Set<BondEvent>().SingleOrDefault(b => b.ReferenceID == bondSeized.referenceID && b.Type == BondEventType.BondCreated && b.SignerId == bondSeized.@operator);
                if (bondCreated == null)
                    continue;
                AddLog(bondSeized.log);
                bondCreated.Released = true;

                var be = db.Find<BondEvent>(bondSeized.log.logIndex, bondSeized.log.transactionHash);
                if (be == null)
                    db.Add(new BondEvent
                    {
                        Amount = -bondCreated.Amount,
                        ReferenceID = bondSeized.referenceID,
                        DepositId = bondCreated.DepositId,
                        TransactionId = bondSeized.log.transactionHash,
                        LogIndex = bondSeized.log.logIndex,
                        SignerId = bondSeized.@operator,
                        Type = BondEventType.BondSeized
                    });

                db.SaveChanges();
            }

            var bn = uint.MaxValue;
            if (resultTx.result.Count > 0)
                bn = Math.Min(bn, resultTx.result.Max(o => uint.Parse(o.blockNumber)));
            if (tdt2btcTx.result.Count > 0)
                bn = Math.Min(bn, tdt2btcTx.result.Max(o => uint.Parse(o.blockNumber)));
            
            if (bn < uint.MaxValue)
                lastBlock = bn;
            else
                lastBlock = toBlock;

            if (network.LastBlock != getBlockNumberResult)
            {
                network.LastBlock = getBlockNumberResult;
                network.LastBlockAt = DateTime.Now;
            }

            db.SaveChanges();
            _logger.LogInformation($"Last block processed: {lastBlock}/{getBlockNumberResult}");

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
                    _logger.LogInformation($"Saved tx {tx.hash} ({tx.TimeStamp})");
                }
            }

            void AddTx2(Etherscan.Tx tx, Redeem r)
            {
                if (db.Find<Transaction>(tx.hash) == null)
                {
                    string tx_error = "";
                    if (tx.isError == "1")
                        tx_error = _apiClient.GetTxStatus(tx.hash).result.errDescription;
                    db.Add(new Transaction
                    {
                        Id = tx.hash,
                        Redeem = r,
                        Block = uint.Parse(tx.blockNumber),
                        Status = DepositStatus.Closed,
                        RedeemStatus = r.Status,
                        IsError = tx.isError == "1",
                        Error = tx_error,
                        Timestamp = tx.TimeStamp,
                        Amount = decimal.Parse(tx.value) / 1000000000000000000,
                        Fee = decimal.Parse(tx.gasPrice) / 1000000000000000000 * decimal.Parse(tx.gasUsed),
                        Kind = network.Kind,
                        Sender = tx.from,
                        Recipient = tx.to
                    });
                    _logger.LogInformation($"Saved tx {tx.hash} ({tx.TimeStamp})");
                }
            }

            void AddLog(Etherscan.Log log, Deposit? d = null, DepositStatus? s = null)
            {
                if (db.Find<Transaction>(log.transactionHash) == null)
                {
                    db.Add(new Transaction
                    {
                        Id = log.transactionHash,
                        Deposit = d,
                        Block = uint.Parse(log.blockNumber.Substring(2), System.Globalization.NumberStyles.HexNumber),
                        Status = s,
                        Timestamp = log.TimeStamp,
                        Error = "",
                        Fee = ulong.Parse(log.gasPrice.Substring(2), System.Globalization.NumberStyles.HexNumber) /
                            1000000000000000000M * ulong.Parse(log.gasUsed.Substring(2),
                                System.Globalization.NumberStyles.HexNumber),
                        Kind = network.Kind
                    });
                    _logger.LogInformation($"Saved tx {log.transactionHash} ({log.TimeStamp})");
                }
            }

            void AddLog2(Etherscan.Log log, Redeem r, RedeemStatus s)
            {
                if (db.Find<Transaction>(log.transactionHash) == null)
                {
                    db.Add(new Transaction
                    {
                        Id = log.transactionHash,
                        Redeem = r,
                        Block = uint.Parse(log.blockNumber.Substring(2), System.Globalization.NumberStyles.HexNumber),
                        Status = DepositStatus.Closed,
                        RedeemStatus = s,
                        Timestamp = log.TimeStamp,
                        Error = "",
                        Fee = ulong.Parse(log.gasPrice.Substring(2), System.Globalization.NumberStyles.HexNumber) /
                            1000000000000000000M * ulong.Parse(log.gasUsed.Substring(2),
                                System.Globalization.NumberStyles.HexNumber),
                        Kind = network.Kind
                    });
                    _logger.LogInformation($"Saved tx {log.transactionHash} ({log.TimeStamp})");
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