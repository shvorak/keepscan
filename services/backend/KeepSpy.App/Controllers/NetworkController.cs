using System.Threading.Tasks;
using KeepSpy.App.Abstraction;
using KeepSpy.Domain;
using KeepSpy.Storage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KeepSpy.App.Controllers
{
    
    [Route("api/[controller]")]
    public class NetworkController: BaseController
    {
        public KeepSpyContext DbContext { get; }

        public NetworkController(KeepSpyContext dbContext)
        {
            DbContext = dbContext;
        }

        [HttpGet]
        public Task<Network[]> Get() => DbContext.Set<Network>().ToArrayAsync();
    }
}