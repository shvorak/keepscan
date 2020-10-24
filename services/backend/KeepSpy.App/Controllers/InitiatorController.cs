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
    public class InitiatorController : BaseController
    {
        public InitiatorController(KeepSpyContext db, IMapper mapper) : base(db, mapper)
        {
        }

        [HttpGet]
        public Task<Paged<InitiatorView>> Get([FromQuery] InitiatorFilterDto filter, [FromQuery] PagerQuery pager)
            => Db.Set<InitiatorView>()
                .WhereIf(filter.Search != null, x => x.Id.Contains(filter.Search!))
                .ToPagedAsync(pager);

        [HttpGet("{id}")]
        public async Task<InitiatorDetailedDto> Get([FromRoute] string id)
        {
            var entity = await Db.Set<InitiatorView>()
                .SingleOrDefaultAsync(x => x.Id == id);

            var redeems = Db.Set<OperationRedeemView>()
                .Where(x => x.SenderAddress == id);

            var deposits = Db.Set<OperationDepositView>()
                .Where(x => x.SenderAddress == id);

            var commission = Db.Set<Transaction>()
                    .Where(x => x.Deposit.SenderAddress == id || x.Redeem.SenderAddress == id)
                ;

            var projection = new InitiatorDetailedDto
            {
                Id = entity.Id,
                Minted = new InitiatorDetailedDto.Stat(entity.DepositCount, entity.DepositAmount),
                Redeemed = new InitiatorDetailedDto.Stat(entity.RedeemCount, entity.RedeemAmount),
                DepositsFailed = await CreateStat(deposits
                    .Where(x => x.Status == (int) DepositStatus.SetupFailed)
                ),
                DepositsProcessing = await CreateStat(deposits
                    .Where(x => x.Status != (int) DepositStatus.Closed && 
                                x.Status != (int) DepositStatus.SetupFailed &&
                                x.Status != (int) DepositStatus.Minted)
                ),
                RedeemsProcessing = await CreateStat(redeems
                    .Where(x => x.Status != (int) RedeemStatus.Liquidated &&
                                x.Status != (int) RedeemStatus.Liquidation &&
                                x.Status != (int) RedeemStatus.Redeemed
                                )
                ),
                RedeemsLiquidation = await CreateStat(redeems
                    .Where(x => x.Status == (int) RedeemStatus.Liquidation)
                ),
                RedeemsLiquidated = await CreateStat(redeems
                    .Where(x => x.Status == (int) RedeemStatus.Liquidated)
                ),
                TotalEthSpent = await commission.Where(x => x.Kind == NetworkKind.Ethereum)
                    .SumAsync(x => x.Fee),
                TotalBtcSpent = await commission.Where(x => x.Kind == NetworkKind.Bitcoin)
                    .SumAsync(x => x.Fee),
                LastSeenAt = entity.LastSeenAt
            };

            return projection;
        }

        private async Task<InitiatorDetailedDto.Stat?> CreateStat(IQueryable<OperationView> query)
        {
            var count = await query.CountAsync();
            if (count == 0)
            {
                return null;
            }

            return new InitiatorDetailedDto.Stat(
                count,
                await query.SumAsync(x => x.LotSize)
            );
        }

        [HttpGet("{id}/operation")]
        public async Task<Paged<OperationDto>> Operations([FromRoute] string id,
            [FromQuery] InitiatorOperationFilterDto filter, [FromQuery] PagerQuery pager)
        {
            var paged = await Db.Set<OperationView>()
                .Where(x => x.SenderAddress == id)
                .WhereIf(filter.Search != null,
                    x => x.BitcoinAddress.Contains(filter.Search!) || x.Tdt.Contains(filter.Search!))
                .WhereIf(filter.Type != null, x => x.Type == filter.Type)
                .WhereIf(filter.Size != null, x => x.LotSize == filter.Size)
                .OrderByDescending(x => x.CreatedAt)
                .ProjectTo<OperationDto>(Mapper.ConfigurationProvider)
                .ToPagedAsync(pager);


            // TODO: This is a terrible solution. Will be refactored later
            var keys = paged.Items.Select(x => x.Tdt).ToArray();

            var transactions = await Db.Set<Transaction>()
                .Where(x => keys.Contains(x.DepositId) || keys.Contains(x.RedeemId))
                .ToArrayAsync();

            foreach (var operation in paged.Items)
            {
                operation.Transactions = transactions
                        .Where(x => operation.Type == "deposit" && x.DepositId == operation.Tdt ||
                                    operation.Type == "redeem" && x.RedeemId == operation.Tdt)
                        .Select(x => new OperationTxDto
                        {
                            Status = (int?) x.RedeemStatus ?? (int) x.Status,
                            Timestamp = x.Timestamp
                        })
                        .ToArray()
                    ;
            }

            return paged;
        }
    }
}