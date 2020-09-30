using System.Linq;
using System.Threading.Tasks;
using KeepSpy.Domain;
using KeepSpy.Storage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KeepSpy.App.Controllers
{
    
    [Route("api/[controller]")]
    public class RedeemController
    {
        private readonly KeepSpyContext _db;

        public RedeemController(KeepSpyContext db)
        {
            _db = db;
        }

        [HttpGet("latest")]
        public Task<Redeem[]> Latest() => _db.Set<Redeem>()
            .OrderByDescending(x => x.CreatedAt)
            .Take(10)
            .ToArrayAsync();
    }
}