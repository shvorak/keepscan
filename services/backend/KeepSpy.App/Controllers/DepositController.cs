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
    [Route("api/deposit")]
    public class DepositController : BaseController
    {
        public DepositController(KeepSpyContext db, IMapper mapper) : base(db, mapper)
        {
        }

        /// <summary>
        /// All deposits with filter and pagination 
        /// </summary>
        [HttpGet]
        public Task<Paged<DepositDto>> Get([FromQuery] PagerQuery query, [FromQuery] DepositFilterDto filter)
            => Db.Set<Deposit>()
                .OrderByDescending(x => x.CreatedAt)
                .WhereIf(filter.Search.HasValue(),
                    x => x.Id.Contains(filter.Search) || x.BitcoinAddress.Contains(filter.Search) ||
                         x.SenderAddress.Contains(filter.Search))
                .WhereIf(filter.LotSize.HasValue, x => x.LotSize == filter.LotSize)
                .WhereIf(filter.Status.HasValue, x => x.Status == filter.Status)
                .ProjectTo<DepositDto>(Mapper.ConfigurationProvider)
                .ToPagedAsync(query);

        /// <summary>
        /// Detailed information about the deposit by its ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<DepositDetailsDto> Get([FromRoute] string id)
        {
            var result = await Db.Set<Deposit>()
                .Where(x => x.Id == id)
                .ProjectTo<DepositDetailsDto>(Mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

            // Calc Collateralization percentage
            var price = await Db.Set<CurrencyRate>()
                .Where(c => c.Source == CurrencyRateSource.MedianETHBTC && c.TradePair == TradePair.ETHBTC)
                .WhereIf(result.Status == DepositStatus.Closed, c => c.Timestamp <= result.UpdatedAt)
                .OrderByDescending(c => c.Timestamp)
                .FirstOrDefaultAsync();

            var bondValue = await Db.Set<Bond>()
                .Where(b => b.DepositId == id)
                .SumAsync(b => b.Amount);

            result.Bond = bondValue;
            result.Collateralization = bondValue * 100M / (result.LotSize!.Value / price.Value);

            result.SpentFee = await Db.Set<Transaction>()
                .Where(x => x.DepositId == id && x.Kind == NetworkKind.Ethereum)
                .SumAsync(x => x.Amount + x.Fee);

            return result;
        }

        /// <summary>
        /// Transaction information by DepositID
        /// </summary>
        [HttpGet("{id}/transactions")]
        public Task<Transaction[]> Transactions([FromRoute] string id) => Db.Set<Transaction>()
            .Where(t => t.DepositId == id)
            .OrderByDescending(t => t.Timestamp)
            .ToArrayAsync();

        /// <summary>
        /// Information about the last 10 deposits
        /// </summary>
        [HttpGet("latest")]
        public Task<DepositDto[]> Latest()
            => Db.Set<Deposit>()
                .OrderByDescending(x => x.CreatedAt)
                .ProjectTo<DepositDto>(Mapper.ConfigurationProvider)
                .Take(10)
                .ToArrayAsync();


        /// <summary>
        /// Get a random TDT by lot size
        /// </summary>
        [HttpGet("random")]
        public async Task<RandomTdtId?> Random([FromQuery] decimal lotSize)
        {
            return await Db.Set<Deposit>()
                .FromSqlInterpolated($@"
                    SELECT * from (
                        SELECT id, (select sum(amount) from bond where deposit_id = id)/lot_size as bond, contract_id
                        FROM deposit
                        WHERE status = 5 AND lot_size = {lotSize}
                        ORDER BY 2
                    LIMIT (SELECT count(id) FROM deposit WHERE status = 5 AND lot_size = {lotSize}) * 50 / 100) as list
                    ORDER BY random()
                    LIMIT 1"
                )
                .Select(x => new RandomTdtId
                {
                    LotSize = lotSize,
                    Address = x.Id,
                    ContractId = x.ContractId
                })
                .FirstOrDefaultAsync();
        }
    }
}