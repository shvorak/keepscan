using System;
using KeepSpy.Domain;

namespace KeepSpy.Models
{
    public class RedeemTxDto
    {
        public string Id { get; set; }
        public string RedeemId { get; set; }
        public DateTime Timestamp { get; set; }
        public RedeemStatus Status { get; set; }
        public uint Block { get; set; }
        public decimal Amount { get; set; }
        public decimal Fee { get; set; }
        public bool IsError { get; set; }
        public string Error { get; set; }
    }
}