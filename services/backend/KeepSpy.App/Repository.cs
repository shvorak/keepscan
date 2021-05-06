using KeepSpy.App.Etherscan;
using KeepSpy.Domain;
using KeepSpy.Storage;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace KeepSpy.App
{
	public class Repository
	{
		private readonly KeepSpyContext _db;
		private readonly ILogger<Repository> _logger;

		public Repository(KeepSpyContext db, ILogger<Repository> logger)
		{
			_db = db;
			_logger = logger;
		}
		public void AddLog(Log log)
		{
			if (_db.Find<ContractLog>(log.transactionHash, log.logIndex) == null)
			{
				try
				{
					var test = log.Fee;
				}
				catch (Exception e)
				{
					_logger.LogError($"{log.gasPrice} ${log.gasUsed}");
					throw;
				}
				_db.Add(new ContractLog
				{
					Address = log.address,
					BlockNumber = log.BlockNumber,
					CreatedAt = DateTime.Now,
					Data = log.data.Substring(2),
					Fee = log.Fee,
					LogIndex = log.logIndex,
					TimeStamp = log.TimeStamp,
					Topic0 = log.topics[0],
					Topic1 = log.topics.Count > 1 ? log.topics[1] : "",
					Topic2 = log.topics.Count > 2 ? log.topics[2] : "",
					Topic3 = log.topics.Count > 3 ? log.topics[3] : "",
					TransactionId = log.transactionHash,
					Amount = log.data.Length > 2 && log.topics[0] == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" ? (decimal?)BigInteger.Parse(log.data.Substring(2), NumberStyles.HexNumber) / 1e18M : null
				});
				_db.SaveChanges();
			}
		}
	}
}
