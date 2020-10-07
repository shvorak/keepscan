using System;
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
    [Route("api/[controller]")]
    public class StatisticController: BaseController
    {
        public StatisticController(KeepSpyContext db, IMapper mapper) : base(db, mapper)
        {
        }

        [HttpGet]
        public async Task<StatisticsDto> Get()
        {
            var totalMinted = await Db.Set<Deposit>()
                // TODO: Add status redeemed
                .Where(x => (x.Status == DepositStatus.Minted || x.Status == DepositStatus.Closed) &&
                            x.LotSize != null)
                .Select(x => x.LotSize!.Value)
                .SumAsync();

            var totalSupply = await Db.Set<Deposit>()
                .Where(x => x.Status == DepositStatus.Minted && x.LotSize != null)
                .Select(x => x.LotSize!.Value)
                .SumAsync();

            return new StatisticsDto
            {
                TotalMinted = totalMinted,
                TotalSupply = totalSupply,
                SupplyCap = 750m
            };
        }

        [HttpGet("redeems")]
        public ActionResult<DepositStat[]> RedeemStats()
            => Enumerable.Range(-9, 10).Select(i =>
            {
                var date = DateTime.Today.AddDays(i);
                var query = Db.Set<Redeem>()
                    .Where(o => o.CompletedAt.HasValue && o.CompletedAt.Value.Date == date && o.Deposit.LotSize.HasValue);

                return new DepositStat
                {
                    Date = date,
                    Count = query.Count(),
                    Volume = query.Sum(o => o.Deposit.LotSize!.Value)
                };
            }).ToArray();

        [HttpGet("deposits")]
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