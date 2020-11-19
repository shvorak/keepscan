using System;
using System.Collections.Generic;
using System.Text;

namespace KeepSpy.Domain
{
	public class StakeEvent
	{
		public string LogIndex { get; set; }
		public string TransactionId { get; set; }
		public Transaction Transaction { get; set; }
		public Signer Signer { get; set; }
		public string SignerId { get; set; }
		public decimal? Amount { get; set; }
		public StakeEventType Type { get; set; }
		public Deposit? Deposit { get; set; }
		public string? DepositId { get; set; }
		
	}
}
