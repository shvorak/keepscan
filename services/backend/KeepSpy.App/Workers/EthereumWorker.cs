using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;

namespace KeepSpy.App.Workers
{
    public class EthereumWorker: BackgroundService
    {
        private readonly EthereumWorkerOptions _options;

        public EthereumWorker(EthereumWorkerOptions options)
        {
            _options = options;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (false == stoppingToken.IsCancellationRequested)
            {
                // TODO: Do work here

                // Simple interval
                await Task.Delay(1000, stoppingToken);
            }
        }
    }

    public class EthereumWorkerOptions
    {
        public string ApiUrl { get; set; }
    }
}