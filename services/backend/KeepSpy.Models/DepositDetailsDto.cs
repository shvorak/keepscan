using System;

namespace KeepSpy.Models
{
    public class DepositDetailsDto : DepositDto
    {
        public decimal SpentFee { get; set; }

        public string[] Signers { get; set; }

        public string TokenId { get; set; }

        public string DepositTokenContract { get; set; }

        public int? HonestThreshold { get; set; }

        public DateTime? EndOfTerm { get; set; }
    }
}