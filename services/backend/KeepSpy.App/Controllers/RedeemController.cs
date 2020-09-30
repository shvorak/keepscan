using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KeepSpy.App.Abstraction;
using KeepSpy.Domain;
using KeepSpy.Storage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KeepSpy.App.Controllers
{
    
    [Route("api/[controller]")]
    public class RedeemController: BaseController
    {
        public RedeemController(KeepSpyContext db, IMapper mapper) : base(db, mapper)
        {
        }

        [HttpGet("latest")]
        public Task<Redeem[]> Latest() => Db.Set<Redeem>()
            .OrderByDescending(x => x.CreatedAt)
            .Take(10)
            .ToArrayAsync();
    }
}