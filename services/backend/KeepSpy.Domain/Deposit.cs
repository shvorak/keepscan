using System;
using System.Collections.Generic;
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
        public string? TokenID { get; set; }
        public decimal? BtcFunded { get; set; }
        public string? KeepAddress { get; set; }
        public int? HonestThreshold { get; set; }

        public ICollection<Transaction> Transactions { get; set; }
        public ICollection<DepositSigner> Signers { get; set; }
    }
}