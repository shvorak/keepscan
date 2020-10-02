using System;
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
    public class DepositController : BaseController
    {
        public DepositController(KeepSpyContext db, IMapper mapper) : base(db, mapper)
        {
        }

        [HttpGet]
        public Task<Paged<DepositDto>> Get([FromQuery] PagerQuery query, [FromQuery] DepositFilterDto filter)
            => Db.Set<Deposit>()
                .OrderByDescending(x => x.CreatedAt)
                .WhereIf(filter.Search.HasValue(),
                    x => x.Id == filter.Search || x.BitcoinAddress == filter.Search || x.ContractId == filter.Search ||
                         x.SenderAddress == filter.Search)
                .WhereIf(filter.LotSize.HasValue, x => x.LotSize == filter.LotSize)
                .WhereIf(filter.Status.HasValue, x => x.Status == filter.Status)
                .ProjectTo<DepositDto>(Mapper.ConfigurationProvider)
                .ToPagedAsync(query);

        [HttpGet("{id}")]
        public async Task<DepositDetailsDto> Get([FromRoute] string id)
        {
            var result = await Db.Set<Deposit>()
                .Where(x => x.Id == id)
                .ProjectTo<DepositDetailsDto>(Mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

            result.SpentFee = await Db.Set<Transaction>()
                .Where(x => x.DepositId == id && x.Kind == NetworkKind.Ethereum)
                .SumAsync(x => x.Amount + x.Fee);
            
            return result;
        }

        [HttpGet("latest")]
        public Task<DepositDto[]> Latest()
            => Db.Set<Deposit>()
                .OrderByDescending(x => x.CreatedAt)
                .ProjectTo<DepositDto>(Mapper.ConfigurationProvider)
                .Take(10)
                .ToArrayAsync();


        [HttpGet("random")]
        public async Task<RandomTdtId?> Random([FromQuery] decimal lotSize)
        {
            var rand = new Random();
            var query = Db.Set<Deposit>()
                .Where(x => x.Status == DepositStatus.Minted && x.LotSize == lotSize && x.Contract.Active);

            var count = await query.CountAsync();

            if (count == 0)
            {
                return null;
            }

            return await query
                .Select(x => new RandomTdtId
                {
                    LotSize = lotSize,
                    Address = x.Id,
                    ContractId = x.ContractId
                })
                .Skip(rand.Next(count))
                .FirstAsync();
        }

        [HttpGet("reset")]
        public string Reset()
        {
            Db.Set<Transaction>().RemoveRange(Db.Set<Transaction>());
            Db.Set<Redeem>().RemoveRange(Db.Set<Redeem>());
            Db.Set<Deposit>().RemoveRange(Db.Set<Deposit>());
            Db.SaveChanges();
            return "OK";
        }
    }
}