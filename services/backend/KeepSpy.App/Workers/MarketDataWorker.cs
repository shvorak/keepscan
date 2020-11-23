using System;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using KeepSpy.Domain;
using KeepSpy.Storage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace KeepSpy.App.Workers
{
	public class MarketDataWorker : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly string _apiUrl;

        public MarketDataWorker(IServiceProvider serviceProvider, string apiUrl)
        {
            _serviceProvider = serviceProvider;
            _apiUrl = apiUrl;
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
                    Run(db, log);
                }
                catch (Exception e)
                {
                    log.LogError(e, "Market data logging");
                }

                await Task.Delay(TimeSpan.FromMinutes(10), stoppingToken);
            }
        }

        private void Run(KeepSpyContext db, ILogger<RefreshViewWorker> logger)
        {
            logger.LogInformation("Market data logging");

            var timestamp = DateTime.UtcNow.Date.AddHours(DateTime.UtcNow.Hour);

            var prices = db.Set<CurrencyRate>().Where(r => r.Source == CurrencyRateSource.CryptoCompare && r.Timestamp == timestamp).ToList();
            if (prices.Count == 0)
			{
                var wc = new WebClient();
                var apiResult = wc.DownloadString(_apiUrl);
                var md = JsonSerializer.Deserialize<MarketData>(apiResult);
                db.Add(new CurrencyRate
                {
                    Source = CurrencyRateSource.CryptoCompare,
                    Timestamp = timestamp,
                    TradePair = TradePair.KEEPBTC,
                    Value = md.BTC
                });
                db.Add(new CurrencyRate
                {
                    Source = CurrencyRateSource.CryptoCompare,
                    Timestamp = timestamp,
                    TradePair = TradePair.KEEPETH,
                    Value = md.ETH
                });
                db.Add(new CurrencyRate
                {
                    Source = CurrencyRateSource.CryptoCompare,
                    Timestamp = timestamp,
                    TradePair = TradePair.KEEPUSD,
                    Value = md.USD
                });
                db.SaveChanges();
                logger.LogWarning($"Market data on {timestamp} - KEEP/USD:{md.USD}; KEEP/BTC:{md.BTC}, KEEP/ETH:{md.ETH}");
            }            
        }

        public class MarketData
        {
            public decimal BTC { get; set; }
            public decimal USD { get; set; }

            public decimal ETH { get; set; }
        }
    }
}