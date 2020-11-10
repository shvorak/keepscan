using KeepSpy.App.Etherscan;
using KeepSpy.Domain;
using KeepSpy.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepSpy.App
{
	public class Repository
	{
		KeepSpyContext db;
		public Repository(KeepSpyContext db)
		{
			this.db = db;
		}
		public void AddLog(Log log)
		{
			if (db.Find<ContractLog>(log.transactionHash, log.logIndex) == null)
			{
				db.Add(new ContractLog
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
					TransactionId = log.transactionHash
				});
				db.SaveChanges();
			}
		}
	}
}
