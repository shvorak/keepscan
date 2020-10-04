using KeepSpy.Domain;

namespace KeepSpy.Models.Requests
{
    public class RedeemFilterDto
    {
        public string? Search { get; set; }
        
        public decimal? LotSize { get; set; }
        
        public RedeemStatus? Status { get; set; }
    }
}