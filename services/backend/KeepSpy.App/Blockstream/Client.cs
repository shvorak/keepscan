using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace KeepSpy.App.Blockstream
{
	public class Client
	{
		string _baseUrl;
		WebClient wc = new WebClient();
		public Client(string baseUrl)
		{
			_baseUrl = baseUrl;
		}

		T GetResult<T>(string path)
		{
			string requestUrl = _baseUrl + path;
			string httpApiResult = wc.DownloadString(requestUrl);
			return JsonSerializer.Deserialize<T>(httpApiResult);
		}

		public Block[] GetBlocks()
		{
			return GetResult<Block[]>("/blocks/tip");
		}
		public Utxo[] GetUtxo(string addr)
		{
			try
			{
				return GetResult<Utxo[]>($"/address/{addr}/utxo");
			}
			catch 
			{
				return new Utxo[0];
			}

		}
		public Address GetAddress(string addr)
		{
			return GetResult<Address>($"/address/{addr}");
		}
	}
}
