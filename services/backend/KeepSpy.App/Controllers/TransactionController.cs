using System;
using System.Linq;
using System.Threading.Tasks;
using KeepSpy.App.Abstraction;
using KeepSpy.App.Models;
using KeepSpy.Domain;
using KeepSpy.Storage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KeepSpy.App.Controllers
{
    [Route("api/[controller]")]
    public class TransactionController : BaseController
    {
        private readonly KeepSpyContext _db;

        public TransactionController(KeepSpyContext db)
        {
            _db = db;
        }

        [HttpGet]
        public Task<Transaction[]> Get(string id) => _db.Set<Transaction>().Where(t => t.DepositId == id).OrderByDescending(t => t.Timestamp).ToArrayAsync();
        
    }
}
