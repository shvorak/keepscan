using KeepSpy.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace KeepSpy.App.Ethereum
{
	public class TokenStaking
	{
		IList<ContractLog> logs;
		public TokenStaking(KeepSpy.Storage.KeepSpyContext db, uint fromBlock, uint toBlock)
		{
			logs = db.Set<ContractLog>().Where(o => o.BlockNumber >= fromBlock && o.BlockNumber <= toBlock).AsNoTracking().ToList();
		}

		public IEnumerable<(string grantId, decimal amount, string @operator, ContractLog log)> GetTokenGrantStaked()
		{
			return logs
				.Where(l => l.Topic0 == "0xf05c07b89b3e4ff57b17aa6883ec35e90d7710c57a038c49c3ec3911a80c2445")
				.Select(l => (l.Topic1, (decimal)BigInteger.Parse(l.Data.Substring(0,64), NumberStyles.HexNumber) / 1000000000000000000M, "0x" + l.Data.Substring(88), l));
		}

		public IEnumerable<(string owner, string @operator, ContractLog log)> GetStakeDelegated()
		{
			return logs
				.Where(l => l.Topic0 == "0x83455714d30de40b1396056e44480074130d2ac0a2a7bd7cb1dfcd6d619e1724")
				.Select(l => ("0x" + l.Topic1.Substring(26), "0x" + l.Topic2.Substring(26), l));
		}

		public IEnumerable<(string @operator, string beneficiary, string authorizer, decimal amount, ContractLog log)> GetOperatorStaked()
		{
			return logs
				.Where(l => l.Topic0 == "0x175a298cbf37645403c82164f78783abb2869a97657c362fe979817d3184cc51")
				.Select(l => ("0x" + l.Topic1.Substring(26), l.Topic2.Substring(26), l.Topic3.Substring(26), (decimal)BigInteger.Parse(l.Data, NumberStyles.HexNumber) / 1000000000000000000M, l));
		}
		public IEnumerable<(string @operator, decimal amount, ContractLog log)> GetTopUpInitiated()
		{
			return logs
				.Where(l => l.Topic0 == "0x7247f13a55f262369e97edefca12bc427eea3f7db14e50fa2fc6ff3a0a91bb6e")
				.Select(l => ("0x" + l.Topic1.Substring(26), (decimal)BigInteger.Parse(l.Data, NumberStyles.HexNumber) / 1000000000000000000M, l));
		}
		public IEnumerable<(string @operator, decimal amount, ContractLog log)> GetTopUpCompleted()
		{
			return logs
				.Where(l => l.Topic0 == "0x4e5ca729097a0a93d0ffa83b56a620b4b516cbe2a02164cd809bf68fdbda23b2")
				.Select(l => ("0x" + l.Topic1.Substring(26), (decimal)BigInteger.Parse(l.Data, NumberStyles.HexNumber) / 1000000000000000000M, l));
		}
		public IEnumerable<(string @operator, DateTime undelegatedAt, ContractLog log)> GetUndelegated()
		{
			return logs
				.Where(l => l.Topic0 == "0x4ae68879209bc4b489a38251122202a3653305e3d95a27baf7a5681410c90b38")
				.Select(l => ("0x" + l.Topic1.Substring(26), new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds((int)BigInteger.Parse(l.Data, NumberStyles.HexNumber)), l));
		}
		public IEnumerable<(string @operator, ContractLog log)> GetRecoveredStake()
		{
			return logs
				.Where(l => l.Topic0 == "0xd8d7d3f648c98e58aaabbb17253dc4a04c610cf9d36f0a42400015b56d741072")
				.Select(l => ("0x" + l.Data.Substring(24), l));
		}
		public IEnumerable<(string @operator, decimal amount, ContractLog log)> GetTokensSeized()
		{
			return logs
				.Where(l => l.Topic0 == "0xc5c18d4a60510957a4dc6dbd6d40ecfcfa32ab9517528a6b4052729e48e183d3")
				.Select(l => ("0x" + l.Topic1.Substring(26), (decimal)BigInteger.Parse(l.Data, NumberStyles.HexNumber) / 1000000000000000000M, l));
		}
		public IEnumerable<(string @operator, string lockCreator, DateTime until, ContractLog log)> GetStakeLocked()
		{
			return logs
				.Where(l => l.Topic0 == "0x82358c8f3a8a41c7cae8a1196ae5106f7b58ce60eb38b7bc6fe3086d079d2a4e")
				.Select(l => ("0x" + l.Topic1.Substring(26), "0x" + l.Data.Substring(24,40), new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds((int)BigInteger.Parse(l.Data.Substring(64), NumberStyles.HexNumber)), l));
		}
		public IEnumerable<(string @operator, string lockCreator, ContractLog log)> GetLockReleased()
		{
			return logs
				.Where(l => l.Topic0 == "0x9519d27283057289b75ef2605d6818602822861717fc48c918d37fe1fdc523f4")
				.Select(l => ("0x" + l.Topic1.Substring(26), "0x" + l.Data.Substring(24), l));
		}
	}
}
