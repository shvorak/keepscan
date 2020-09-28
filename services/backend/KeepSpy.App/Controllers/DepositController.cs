using System;
using System.Linq;
using System.Threading.Tasks;
using KeepSpy.App.Abstraction;
using KeepSpy.App.Models;
using KeepSpy.Domain;
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
        private readonly KeepSpyContext _db;

        public DepositController(KeepSpyContext db)
        {
            _db = db;
        }

        [HttpGet]
        public Task<Paged<Deposit>> Get([FromQuery] PagerQuery query) 
            => _db.Set<Deposit>().ToPagedAsync(query);

        [HttpGet("{id}")]
        public Task<Deposit> Get([FromRoute] string id) => _db.Set<Deposit>()
            .Where(x => x.Id == id).SingleOrDefaultAsync();
        
        [HttpGet("latest")]
        public Task<Deposit[]> Latest()
            => _db.Set<Deposit>().OrderByDescending(x => x.CreatedAt).Take(10).ToArrayAsync();


        [HttpGet("random")]
        public async Task<RandomTdtId?> Random([FromQuery] decimal lotSize)
        {
            var rand = new Random();
            var query = _db.Set<Deposit>()
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
    }
}