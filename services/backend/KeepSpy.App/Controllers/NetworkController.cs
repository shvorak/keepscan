using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using KeepSpy.App.Abstraction;
using KeepSpy.App.Workers;
using KeepSpy.Domain;
using KeepSpy.Storage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KeepSpy.App.Controllers
{
    [Route("api/network")]
    public class NetworkController : BaseController
    {
        private readonly BitcoinWorkerOptions _bitcoinWorkerOptions;
        private readonly EthereumWorkerOptions _ethereumWorkerOptions;

        public NetworkController(KeepSpyContext db, IMapper mapper, BitcoinWorkerOptions bitcoinWorkerOptions,
            EthereumWorkerOptions ethereumWorkerOptions) : base(db, mapper)
        {
            _bitcoinWorkerOptions = bitcoinWorkerOptions;
            _ethereumWorkerOptions = ethereumWorkerOptions;
        }

        /// <summary>
        /// Detailed network status information
        /// </summary>
        [HttpGet]
        public Task<Network[]> Get() => Db.Set<Network>()
            // TODO: Remove this condition after removing test networks in production environment 
            .Where(x => x.Kind == NetworkKind.Bitcoin && x.IsTestnet == _bitcoinWorkerOptions.IsTestnet ||
                        x.Kind == NetworkKind.Ethereum && x.IsTestnet == _ethereumWorkerOptions.IsTestnet)
            .ToArrayAsync();
    }
}