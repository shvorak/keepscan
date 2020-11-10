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
	public class KeepBonding
	{
		IList<ContractLog> logs;
		public KeepBonding(KeepSpy.Storage.KeepSpyContext db, uint fromBlock, uint toBlock)
		{
			logs = db.Set<ContractLog>().Where(o => o.BlockNumber >= fromBlock && o.BlockNumber <= toBlock).AsNoTracking().ToList();
        }
				
		public IEnumerable<(string @operator, string holder, string sortitionPool, string referenceID, decimal amount, ContractLog log)> GetBondCreated()
		{
			return logs
				.Where(l => l.Topic0 == "0xa5543d8e139d9ab4342d5c4f6ec1bff5a97f9a52d71f7ffe9845b94f1449fc91")
				.Select(l => ("0x" + l.Topic1.Substring(26), "0x" + l.Topic2.Substring(26), l.Topic3, l.Data.Substring(0, 64), (decimal)BigInteger.Parse(l.Data.Substring(64, 64), NumberStyles.HexNumber) / 1000000000000000000M, l));
		}

		public IEnumerable<(string @operator, string referenceID, ContractLog log)> GetBondReleased()
		{
			return logs
				.Where(l => l.Topic0 == "0x60b8ef4216791426b3d7acfb0b6d11a400872350afd70a3ce5ebf62bea7cb0d4")
				.Select(l => ("0x" + l.Topic1.Substring(26), l.Topic2.Substring(2), l));
		}
		public IEnumerable<(string @operator, string referenceID, string destination, decimal amount, ContractLog log)> GetBondSeized()
		{
			return logs
				.Where(l => l.Topic0 == "0xf8e947b47b515d01aa96426822ddcf23a08f42d8c2dbfd65e674ba824f551382")
				.Select(l => ("0x" + l.Topic1.Substring(26), l.Topic2.Substring(2), "0x" + l.Data.Substring(24, 40), (decimal)BigInteger.Parse(l.Data.Substring(64, 64), NumberStyles.HexNumber) / 1000000000000000000M, l));
		}
		public IEnumerable<(string @operator, string beneficiary, decimal amount, ContractLog log)> GetUnbondedValueDeposited()
		{
			return logs
				.Where(l => l.Topic0 == "0xfd586a32ad24d585b1f7b36ee48e66304ad7627b48b39a0ab1d8a3e84741ea2a")
				.Select(l => ("0x" + l.Topic1.Substring(26), "0x" + l.Topic2.Substring(26), (decimal)BigInteger.Parse(l.Data.Substring(0, 64), NumberStyles.HexNumber) / 1000000000000000000M, l));
		}
		public IEnumerable<(string @operator, string beneficiary, decimal amount, ContractLog log)> GetUnbondedValueWithdrawn()
		{
			return logs
				.Where(l => l.Topic0 == "0x5ebf1d16423ab39117c0ca9327215b5bcd423aaf7042044c87248a4423d252d9")
				.Select(l => ("0x" + l.Topic1.Substring(26), "0x" + l.Topic2.Substring(26), (decimal)BigInteger.Parse(l.Data.Substring(0, 64), NumberStyles.HexNumber) / 1000000000000000000M, l));
		}
	}
}
