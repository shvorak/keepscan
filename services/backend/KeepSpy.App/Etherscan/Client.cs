using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace KeepSpy.App.Etherscan
{
	public class Client
	{
		string _baseUrl;
		WebClient wc = new WebClient();
		public Client(string baseUrl)
		{
			_baseUrl = baseUrl;
		}

		Response<T> GetResult<T>(Dictionary<string, object> parameters)
		{
			string requestUrl = _baseUrl + "&" + string.Join("&", parameters.Where(p => p.Value != null).Select(kvp => $"{kvp.Key}={kvp.Value}"));
			string httpApiResult = wc.DownloadString(requestUrl);
			return JsonSerializer.Deserialize<Response<T>>(httpApiResult);
		}

		public Response<Tx> GetAccountTxList(string address, ulong fromBlock, ulong? toBlock = null, string sort = "asc", int? page = 1, int? limit = 1000)
		{
			var parameters = new Dictionary<string, object>()
			{
				{"module", "account" },
				{"action", "txlist" },
				{"address", address },
				{"startblock", fromBlock },
				{"endblock", toBlock ?? 99999999 },
				{"sort", sort },
				{"page", page },
				{"offset",limit }
			};
			return GetResult<Tx>(parameters);
		}
		public Response<Log> GetLogs(string address, ulong fromBlock, ulong? toBlock = null, int? page = 1, int? limit = 1000, string topic0 = null)
		{
			var parameters = new Dictionary<string, object>()
			{
				{"module", "logs" },
				{"action", "getLogs" },
				{"address", address },
				{"fromBlock", fromBlock },
				{"toBlock", toBlock ?? 99999999 },
				{"page", page },
				{"offset", limit },
				{"topic0", topic0 }
			};
			return GetResult<Log>(parameters);
		}
	}

}
