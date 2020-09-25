using System;
using KeepSpy.Shared.Domain;

namespace KeepSpy.Domain
{
    public class Deposit: HasId<string>
    {
        public string SenderAddress { get; set; }
        
        public string? BitcoinAddress { get; set; }
        
        public decimal? LotSize { get; set; }
        
        public decimal? LotSizeFee { get; set; }
        
        public decimal? LotSizeMinted { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public DateTime? CompletedAt { get; set; }
        public DepositStatus Status { get; set; }

        public Contract Contract { get; set; }
        public string ContractId { get; set; }
        public uint? BitcoinFundedBlock { get; set; }
    }
}