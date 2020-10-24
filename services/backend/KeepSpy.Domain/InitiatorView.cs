using System;

namespace KeepSpy.Domain
{
    public class InitiatorView
    {
        public string Id { get; set; }

        public int MintedCount { get; set; }

        public decimal? MintedAmount { get; set; }

        public int RedeemedCount { get; set; }

        public decimal? RedeemedAmount { get; set; }

        public int DepositsCount { get; set; }

        public decimal? DepositsAmount { get; set; }
       
        public int RedeemsCount { get; set; }

        public decimal? RedeemsAmount { get; set; }
 
        public DateTime LastSeenAt { get; set; }
    }
}