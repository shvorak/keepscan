using System;

namespace KeepSpy.Domain
{
    public class InitiatorView
    {
        public string Id { get; set; }

        public int DepositCount { get; set; }

        public decimal? DepositAmount { get; set; }

        public int RedeemCount { get; set; }

        public decimal? RedeemAmount { get; set; }

        public DateTime LastSeenAt { get; set; }
    }
}