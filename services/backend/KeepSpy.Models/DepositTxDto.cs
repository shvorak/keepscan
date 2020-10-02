using System;
using KeepSpy.Domain;

namespace KeepSpy.Models
{
    public class DepositTxDto
    {
        public string Id { get; set; }
        public string DepositId { get; set; }
        public DateTime Timestamp { get; set; }
        public NetworkKind Kind { get; set; }
        public DepositStatus Status { get; set; }
        public uint Block { get; set; }
        public decimal Amount { get; set; }
        public decimal Fee { get; set; }
        public bool IsError { get; set; }
        public string Error { get; set; }
    }
}