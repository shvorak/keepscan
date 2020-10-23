using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KeepSpy.App.Abstraction;
using KeepSpy.Domain;
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
        public Task<InitiatorView> Get([FromRoute] string id) => Db.Set<InitiatorView>()
            .SingleOrDefaultAsync(x => x.Id == id);

        [HttpGet("{id}/operation")]
        public Task<Paged<InitiatorOperationView>> Operations([FromRoute] string id,
            [FromQuery] InitiatorOperationFilterDto filter, [FromQuery] PagerQuery pager)
            => Db.Set<InitiatorOperationView>()
                .Where(x => x.SenderAddress == id)
                .WhereIf(filter.Search != null, x => x.BitcoinAddress.Contains(filter.Search!) || x.Tdt.Contains(filter.Search!))
                .WhereIf(filter.Type != null, x => x.Type == filter.Type)
                .WhereIf(filter.Size != null, x => x.LotSize == filter.Size)
                .OrderByDescending(x => x.CreatedAt)
                .ToPagedAsync(pager);
    }
}