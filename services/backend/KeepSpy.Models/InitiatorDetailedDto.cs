using System;

namespace KeepSpy.Models
{
    public class InitiatorDetailedDto
    {
        public class Stat
        {
            public int Count { get; set; }

            public decimal Amount { get; set; }

            public Stat(int? count, decimal? amount)
            {
                Count = count ?? 0;
                Amount = amount ?? 0M;
            }
        }
        
        public string Id { get; set; }

        public Stat Minted { get; set; }
        public Stat Redeemed { get; set; }

        public Stat Redeems { get; set; }
        
        public Stat Deposits { get; set; }
        
        public Stat? DepositsFailed { get; set; }
        
        public Stat? DepositsProcessing { get; set; }

        public Stat? RedeemsProcessing { get; set; }

        public Stat? RedeemsLiquidation { get; set; }

        public Stat? RedeemsLiquidated { get; set; }

        public decimal TotalBtcSpent { get; set; }

        public decimal TotalEthSpent { get; set; }
        
        public DateTime LastSeenAt { get; set; }
    }
}