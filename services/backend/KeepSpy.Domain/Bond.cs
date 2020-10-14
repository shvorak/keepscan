using System;
using System.Collections.Generic;
using System.Text;

namespace KeepSpy.Domain
{
	public class Bond
	{
		public Deposit Deposit { get; set; }
		public string DepositId { get; set; }
		public Signer Signer { get; set; }
		public string SignerId { get; set; }
		public decimal Amount { get; set; }
	}
}
