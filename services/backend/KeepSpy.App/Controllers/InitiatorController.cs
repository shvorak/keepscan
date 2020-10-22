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

namespace KeepSpy.App.Controllers
{
    [Route("api/[controller]")]
    public class InitiatorController: BaseController
    {
        public InitiatorController(KeepSpyContext db, IMapper mapper) : base(db, mapper)
        {
        }

        public Task<Paged<Initiator>> Get([FromQuery] InitiatorFilterDto filter, [FromQuery] PagerQuery pager) 
            => Db.Set<Initiator>()
                .WhereIf(filter.Search != null, x => x.Id.Contains(filter.Search!))
                .ToPagedAsync(pager);
    }
}