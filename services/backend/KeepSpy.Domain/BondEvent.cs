using KeepSpy.Shared.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace KeepSpy.Domain
{
	public class BondEvent
	{
		public string LogIndex { get; set; }
		public string TransactionId { get; set; }
		public Transaction Transaction { get; set; }
		public Signer Signer { get; set; }
		public string SignerId { get; set; }
		public decimal Amount { get; set; }
		public string? ReferenceID { get; set; }
		public string? Beneficiary { get; set; }
		public BondEventType Type { get; set; }
		public Deposit? Deposit { get; set; }
		public string? DepositId { get; set; }
		public bool Released { get; set; }
	}
}
