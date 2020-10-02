using KeepSpy.Domain;

namespace KeepSpy.Models.Requests
{
    public class DepositFilterDto
    {
        public string? Search { get; set; }

        public decimal? LotSize { get; set; }

        public DepositStatus? Status { get; set; }
    }
}