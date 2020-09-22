using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;

namespace KeepSpy.App.Workers
{
    public class BitcoinWorker: BackgroundService
    {
        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            throw new System.NotImplementedException();
        }
    }
}