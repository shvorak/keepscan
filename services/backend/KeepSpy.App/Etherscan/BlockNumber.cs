using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepSpy.App.Etherscan
{
	public class BlockNumber
	{
		public string jsonrpc { get; set; }
		public int id { get; set; }
		public string result { get; set; }
	}
}
