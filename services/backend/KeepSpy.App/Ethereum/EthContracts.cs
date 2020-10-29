using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepSpy.App.Ethereum
{
	public class EthContracts
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
        const string LogMedianPriceEvent = "0xb78ebc573f1f889ca9e1e0fb62c843c836f3d3a2e1f43ef62940e9b894f4ea4c";
        const string BondCreatedEvent = "0xa5543d8e139d9ab4342d5c4f6ec1bff5a97f9a52d71f7ffe9845b94f1449fc91";
        Etherscan.Client _apiClient;
        string ethBtcContract;
        uint _delta = 24 * 60 * 4;
        uint _lastBlock;
        public EthContracts(Etherscan.Client apiClient, bool testnet, uint lastBlock)
        {
            _lastBlock = lastBlock;
            _apiClient = apiClient;
            ethBtcContract = testnet
                ? "0x80449a756D5aCe9b221E2f7f61d94941f876d18a"
                : "0x81A679f98b63B3dDf2F17CB5619f4d6775b3c5ED";
        }

        public IEnumerable<(DateTime timeStamp, decimal ethPrice)> GetEthBtc()
		{
            return _apiClient.GetLogs(ethBtcContract, _lastBlock, _lastBlock + _delta, topic0: LogMedianPriceEvent).result.Select(log => 
            {
                var timeStamp = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(ulong.Parse(log.data.Substring(120), System.Globalization.NumberStyles.HexNumber));
                var value = (decimal)System.Numerics.BigInteger.Parse(log.data.Substring(34, 32), System.Globalization.NumberStyles.HexNumber) / 1000000000000000000M;
                return (timeStamp, value);
            });
        }


	}
}
