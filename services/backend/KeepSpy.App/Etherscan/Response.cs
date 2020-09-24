using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepSpy.App.Etherscan
{
	public class Response<T>
	{
		public string status { get; set; }
		public string message { get; set; }
		public IList<T> result { get; set; }
    }
}
