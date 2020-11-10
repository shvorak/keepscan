using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepSpy.App.Ethereum
{
	public class ContractLogs
	{
		string address;
		uint fromBlock;
		uint maxBlock;
		int limit = 1000;
		public bool Finished { get; private set; }
		Etherscan.Client apiClient;
		public ContractLogs(Etherscan.Client apiClient, string address, uint fromBlock, uint maxBlock)
		{
			this.fromBlock = fromBlock;
			this.maxBlock = maxBlock;
			this.address = address;
			this.apiClient = apiClient;
		}

		public IList<Etherscan.Log> GetNextLogs()
		{
			var logs = apiClient.GetLogs(address, fromBlock, maxBlock).result;
			if (logs.Count == limit)
				fromBlock = logs.Max(o => o.BlockNumber);
			else
			{
				Finished = true;
				fromBlock = (logs.Count > 0 ? logs.Max(o => o.BlockNumber) : maxBlock) + 1;
			}
			return logs;
		}
	}
}
