using System;
using System.Threading;
using System.Threading.Tasks;
using KeepSpy.Storage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace KeepSpy.App.Workers
{
    public class RefreshViewWorker: BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public RefreshViewWorker(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (false == stoppingToken.IsCancellationRequested)
            {
                using var scope = _serviceProvider.CreateScope();
                
                var db = scope.ServiceProvider.GetRequiredService<KeepSpyContext>();
                var log = scope.ServiceProvider.GetRequiredService<ILogger<RefreshViewWorker>>();

                try
                {
                    await Update(db, log);
                }
                catch (Exception e)
                {
                    log.LogError(e, "Failed views updating");
                }
                
                await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
            }
        }

        private async Task Update(KeepSpyContext db, ILogger<RefreshViewWorker> logger)
        {
            logger.LogInformation("Running view's updating");
            
            await db.Database.ExecuteSqlRawAsync("REFRESH MATERIALIZED VIEW initiator_view");
            await db.Database.ExecuteSqlRawAsync("REFRESH MATERIALIZED VIEW operation_view");
        }
    }
}