using System;
using System.Collections.Generic;
using System.Text;

namespace KeepSpy.Domain
{
	public class ContractLog
	{
		public string TransactionId { get; set; } = "";
		public string LogIndex { get; set; } = "";
		public decimal Fee { get; set; }
		public DateTime TimeStamp { get; set; }
		public uint BlockNumber { get; set; }
		public string Address { get; set; } = "";
		public string Data { get; set; } = "";
		public string Topic0 { get; set; } = "";
		public string Topic1 { get; set; } = "";
		public string Topic2 { get; set; } = "";
		public string Topic3 { get; set; } = "";
		public DateTime CreatedAt { get; set; }
	}
}
