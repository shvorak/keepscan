using System;

namespace KeepSpy.Domain
{
    public class Initiator
    {
        public string Id { get; set; }

        public uint DepositCount { get; set; }

        public decimal? DepositAmount { get; set; }

        public uint RedeemCount { get; set; }

        public decimal? RedeemAmount { get; set; }

        public DateTime LastSeenAt { get; set; }
    }
}