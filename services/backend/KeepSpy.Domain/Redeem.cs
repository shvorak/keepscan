using System;
using KeepSpy.Shared.Domain;

namespace KeepSpy.Domain
{
	public class Redeem : HasId<string>
	{
		public RedeemStatus Status { get; set; }
		public Deposit Deposit { get; set; }
		public string DepositId { get; set; }
		public DateTime CreatedAt { get; set; }
		public string SenderAddress { get; set; }
		public string? BitcoinAddress { get; set; }
		public decimal? BtcRedeemed { get; set; }
		public decimal? BtcFee { get; set; }
		public uint? BitcoinRedeemedBlock { get; set; }
		public DateTime? UpdatedAt { get; set; }
		public DateTime? CompletedAt { get; set; }
	}
}
