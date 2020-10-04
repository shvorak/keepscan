namespace KeepSpy.Models
{
    public class RedeemDetailsDto : RedeemDto
    {
        public decimal SpentFee { get; set; }
        public string? BitcoinWithdrawalAddress { get; set; }
    }
}