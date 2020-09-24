using System.Linq;
using System.Threading.Tasks;
using KeepSpy.App.Abstraction;
using KeepSpy.Domain;
using KeepSpy.Storage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KeepSpy.App.Controllers
{
    [Route("api/[controller]")]
    public class DepositController: BaseController
    {
        private readonly KeepSpyContext _db;

        public DepositController(KeepSpyContext db)
        {
            _db = db;
        }

        [HttpGet]
        public Task<Deposit[]> Get() => _db.Set<Deposit>().ToArrayAsync();

        [HttpGet("latest")]
        public Task<Deposit[]> Latest() 
            => _db.Set<Deposit>().OrderByDescending(x => x.CreatedAt).Take(10).ToArrayAsync();

    }
}