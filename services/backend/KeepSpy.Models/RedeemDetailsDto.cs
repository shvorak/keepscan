namespace KeepSpy.Models
{
    public class RedeemDetailsDto : RedeemDto
    {
        public decimal SpentFee { get; set; }
        public string? BitcoinWithdrawalAddress { get; set; }
        
        public string[] Signers { get; set; }

        public string TokenId { get; set; }

        public string DepositTokenContract { get; set; }

        public int? HonestThreshold { get; set; }
    }
}