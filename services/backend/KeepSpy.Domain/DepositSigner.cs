using System;
using System.Collections.Generic;
using System.Text;

namespace KeepSpy.Domain
{
	public class DepositSigner
	{
		public string DepositId { get; set; }
		public Deposit Deposit { get; set; }

		public string SignerId { get; set; }
		public Signer Signer { get; set; }
	}
}
