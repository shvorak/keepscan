using System.Threading;
using System.Threading.Tasks;
using KeepSpy.Storage;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace KeepSpy.App.Workers
{
    public class BitcoinWorker: BackgroundService
    {
        private readonly BitcoinWorkerOptions _options;
        private readonly IServiceScopeFactory _scopeFactory;

        public BitcoinWorker(BitcoinWorkerOptions options, IServiceScopeFactory scopeFactory)
        {
            _options = options;
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Task.Delay(5000, stoppingToken);
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var db = scope.ServiceProvider.GetRequiredService<KeepSpyContext>();


                }

                await Task.Delay(_options.Interval * 1000, stoppingToken);
            }
        }
    }

    public class BitcoinWorkerOptions
    {
        public string ApiUrl { get; set; }
        public int Interval { get; set; }
        public bool IsTestnet { get; set; }
    }
}