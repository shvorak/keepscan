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
    [Route("api/transaction")]
    public class TransactionController : BaseController
    {
        public TransactionController(KeepSpyContext db, IMapper mapper) : base(db, mapper)
        {
        }

        /// <summary>
        /// Transaction information by ID
        /// </summary>
        [HttpGet]
        public Task<Transaction[]> Get(string id) => Db.Set<Transaction>()
            .Where(t => t.DepositId == id)
            .OrderByDescending(t => t.Timestamp)
            .ToArrayAsync();
        
    }
}
