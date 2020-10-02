using KeepSpy.Shared.Domain;
using System;

namespace KeepSpy.Domain
{
    public class Transaction : HasId<string>
    {
        public Deposit Deposit { get; set; }
        public string? DepositId { get; set; }
        public Redeem Redeem { get; set; }
        public string? RedeemId { get; set; }
        public DateTime Timestamp { get; set; }
        public DepositStatus Status { get; set; }
        public RedeemStatus? RedeemStatus { get; set; }
        public uint Block { get; set; }
        public decimal Amount { get; set; }
        public decimal Fee { get; set; }
        public bool IsError { get; set; }
        public string Error { get; set; }
        public string? Sender { get; set; }
        public string? Recipient { get; set; }
        public NetworkKind Kind { get; set; }
        
    }
}