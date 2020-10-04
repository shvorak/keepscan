using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using KeepSpy.App.Abstraction;
using KeepSpy.Domain;
using KeepSpy.Models;
using KeepSpy.Models.Requests;
using KeepSpy.Shared.Extensions;
using KeepSpy.Shared.Models;
using KeepSpy.Storage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KeepSpy.App.Controllers
{
    [Route("api/[controller]")]
    public class RedeemController : BaseController
    {
        public RedeemController(KeepSpyContext db, IMapper mapper) : base(db, mapper)
        {
        }

        [HttpGet("{id}")]
        public async Task<RedeemDetailsDto> Get(string id)
        {
            var result = await Db.Set<Redeem>()
                .Where(x => x.Id == id)
                .ProjectTo<RedeemDetailsDto>(Mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

            result.SpentFee = await Db.Set<Transaction>()
                .Where(x => x.RedeemId == id && x.Kind == NetworkKind.Ethereum)
                .SumAsync(x => x.Amount + x.Fee);

            return result;
        }

        [HttpGet]
        public Task<Paged<RedeemDto>> Get([FromQuery] PagerQuery query, [FromQuery] RedeemFilterDto filter) => Db
            .Set<Redeem>()
            .WhereIf(filter.Search.HasValue(),
                x => x.Id.Contains(filter.Search) || x.SenderAddress.Contains(filter.Search) ||
                     x.BitcoinAddress.Contains(filter.Search))
            .WhereIf(filter.Status.HasValue, x => x.Status == filter.Status)
            .WhereIf(filter.LotSize.HasValue, x => x.Deposit.LotSize == filter.LotSize)
            .OrderByDescending(x => x.CreatedAt)
            .ProjectTo<RedeemDto>(Mapper.ConfigurationProvider)
            .ToPagedAsync(query);

        [HttpGet("latest")]
        public Task<RedeemDto[]> Latest() => Db.Set<Redeem>()
            .OrderByDescending(x => x.CreatedAt)
            .Take(10)
            .ProjectTo<RedeemDto>(Mapper.ConfigurationProvider)
            .ToArrayAsync();
    }
}