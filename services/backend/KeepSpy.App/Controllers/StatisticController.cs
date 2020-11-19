using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KeepSpy.App.Abstraction;
using KeepSpy.Domain;
using KeepSpy.Models;
using KeepSpy.Storage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KeepSpy.App.Controllers
{
    [Route("api/statistic")]
    public class StatisticController : BaseController
    {
        public StatisticController(KeepSpyContext db, IMapper mapper) : base(db, mapper)
        {
        }

        /// <summary>
        /// Summary of Keep Network statistics
        /// </summary>
        [HttpGet]
        public async Task<StatisticsDto> Get()
        {
            var totalMinted = await Db.Set<ContractLog>()
                // TODO: Add status redeemed
                .Where(x => x.Address == "0x8daebade922df735c38c80c7ebd708af50815faa" &&
                x.Topic0 == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" &&
                x.Topic1 == "0x0000000000000000000000000000000000000000000000000000000000000000")
                .Select(x => x.Amount)
                .SumAsync();

            var totalBurned = await Db.Set<ContractLog>()
                .Where(x => x.Address == "0x8daebade922df735c38c80c7ebd708af50815faa" &&
                x.Topic0 == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" &&
                x.Topic2 == "0x0000000000000000000000000000000000000000000000000000000000000000")
                .Select(x => x.Amount)
                .SumAsync();

            return new StatisticsDto
            {
                TotalMinted = totalMinted.Value,
                TotalSupply = totalMinted.Value - totalBurned.Value,
                SupplyCap = 21000m
            };
        }

        /// <summary>
        /// Number of operations of different types
        /// </summary>
        [HttpGet("operations")]
        public async Task<OperationStat[]> Operations()
        {
            var dates = Enumerable.Range(-9, 10);
            var items = new List<OperationStat>();
            foreach (var day in dates)
            {
                var date = DateTime.Today.AddDays(day);

                var depositQuery = Db.Set<Deposit>()
                    .Where(o => o.Contract.Active && o.LotSizeMinted.HasValue &&
                                o.CompletedAt.Value.Date == date);

                var redeemQuery = Db.Set<Redeem>()
                    .Where(o => o.CompletedAt.HasValue && o.CompletedAt.Value.Date == date &&
                                o.Deposit.LotSize.HasValue);

                items.Add(new OperationStat
                {
                    Date = DateTime.Today.AddDays(day),
                    DepositsCount = await depositQuery.CountAsync(),
                    DepositsVolume = await depositQuery.SumAsync(o => o.LotSize!.Value),
                    RedeemsCount = await redeemQuery.CountAsync(),
                    RedeemsVolume = await redeemQuery.SumAsync(o => o.Deposit.LotSize!.Value)
                });
            }

            return items.ToArray();
        }

        /// <summary>
        /// Supply information
        /// </summary>
        [HttpGet("supply")]
        public async Task<SupplyStat[]> Supply()
        {
            var range = Enumerable.Range(-9, 10);
            var items = new List<SupplyStat>();
            foreach (var day in range)
            {
                var date = DateTime.Today.AddDays(day);

                var minted = await Db.Set<ContractLog>()
                .Where(x => x.Address == "0x8daebade922df735c38c80c7ebd708af50815faa" &&
                x.Topic0 == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" &&
                x.Topic1 == "0x0000000000000000000000000000000000000000000000000000000000000000" &&
                x.TimeStamp.Date <= date)
                .Select(x => x.Amount)
                .SumAsync();

                var burned = await Db.Set<ContractLog>()
                    .Where(x => x.Address == "0x8daebade922df735c38c80c7ebd708af50815faa" &&
                    x.Topic0 == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" &&
                    x.Topic2 == "0x0000000000000000000000000000000000000000000000000000000000000000" &&
                    x.TimeStamp.Date <= date)
                    .Select(x => x.Amount)
                    .SumAsync();

                var stat = new SupplyStat
                {
                    Date = date,
                    Supply = minted.Value - burned.Value,
                    Minted = minted.Value
                };
                
                items.Add(stat);
            }

            return items.ToArray();
        }

        [HttpGet("redeems")]
        [Obsolete]
        public ActionResult<DepositStat[]> RedeemStats()
            => Enumerable.Range(-9, 10).Select(i =>
            {
                var date = DateTime.Today.AddDays(i);
                var query = Db.Set<Redeem>()
                    .Where(o => o.CompletedAt.HasValue && o.CompletedAt.Value.Date == date &&
                                o.Deposit.LotSize.HasValue);

                return new DepositStat
                {
                    Date = date,
                    Count = query.Count(),
                    Volume = query.Sum(o => o.Deposit.LotSize!.Value)
                };
            }).ToArray();

        [HttpGet("deposits")]
        [Obsolete]
        public ActionResult<DepositStat[]> DepositStats()
            => Enumerable.Range(-9, 10).Select(i =>
            {
                var date = DateTime.Today.AddDays(i);
                var query = Db.Set<Deposit>()
                    .Where(o => o.Contract.Active && o.LotSizeMinted.HasValue &&
                                o.CompletedAt.Value.Date == date);

                return new DepositStat
                {
                    Date = date,
                    Count = query.Count(),
                    Volume = query.Sum(o => o.LotSize.Value)
                };
            }).ToArray();
    }
}