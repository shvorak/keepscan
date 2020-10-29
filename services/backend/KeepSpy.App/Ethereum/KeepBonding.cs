using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepSpy.App.Ethereum
{
	public class KeepBonding
	{
		IList<Etherscan.Log> logs;
		public KeepBonding(Etherscan.Client apiClient, bool testnet, uint fromBlock, uint toBlock)
		{
			logs = apiClient.GetLogs(testnet ? "0x60535a59b4e71f908f3feb0116f450703fb35ed8" : "0x27321f84704a599aB740281E285cc4463d89A3D5", fromBlock, toBlock).result;
        }
				
		public IEnumerable<(string @operator, string holder, string sortitionPool, string referenceID, decimal amount, Etherscan.Log log)> GetBondCreated()
		{
			return logs
				.Where(l => l.topics[0] == "0xa5543d8e139d9ab4342d5c4f6ec1bff5a97f9a52d71f7ffe9845b94f1449fc91")
				.Select(l => ("0x" + l.topics[1].Substring(26), "0x" + l.topics[2].Substring(26), l.topics[3], l.data.Substring(2, 64), (decimal)System.Numerics.BigInteger.Parse(l.data.Substring(66, 64), System.Globalization.NumberStyles.HexNumber) / 1000000000000000000M, l));
		}

		public IEnumerable<(string @operator, string referenceID, Etherscan.Log log)> GetBondReleased()
		{
			return logs
				.Where(l => l.topics[0] == "0x60b8ef4216791426b3d7acfb0b6d11a400872350afd70a3ce5ebf62bea7cb0d4")
				.Select(l => ("0x" + l.topics[1].Substring(26), l.topics[2].Substring(2), l));
		}
		public IEnumerable<(string @operator, string referenceID, string destination, decimal amount, Etherscan.Log log)> GetBondSeized()
		{
			return logs
				.Where(l => l.topics[0] == "0xf8e947b47b515d01aa96426822ddcf23a08f42d8c2dbfd65e674ba824f551382")
				.Select(l => ("0x" + l.topics[1].Substring(26), l.topics[2].Substring(2), "0x" + l.data.Substring(26, 40), (decimal)System.Numerics.BigInteger.Parse(l.data.Substring(66, 64), System.Globalization.NumberStyles.HexNumber) / 1000000000000000000M, l));
		}
		public IEnumerable<(string @operator, string beneficiary, decimal amount, Etherscan.Log log)> GetUnbondedValueDeposited()
		{
			return logs
				.Where(l => l.topics[0] == "0xfd586a32ad24d585b1f7b36ee48e66304ad7627b48b39a0ab1d8a3e84741ea2a")
				.Select(l => ("0x" + l.topics[1].Substring(26), "0x" + l.topics[2].Substring(26), (decimal)System.Numerics.BigInteger.Parse(l.data.Substring(2, 64), System.Globalization.NumberStyles.HexNumber) / 1000000000000000000M, l));
		}
		public IEnumerable<(string @operator, string beneficiary, decimal amount, Etherscan.Log log)> GetUnbondedValueWithdrawn()
		{
			return logs
				.Where(l => l.topics[0] == "0x5ebf1d16423ab39117c0ca9327215b5bcd423aaf7042044c87248a4423d252d9")
				.Select(l => ("0x" + l.topics[1].Substring(26), "0x" + l.topics[2].Substring(26), (decimal)System.Numerics.BigInteger.Parse(l.data.Substring(2, 64), System.Globalization.NumberStyles.HexNumber) / 1000000000000000000M, l));
		}
	}
}
