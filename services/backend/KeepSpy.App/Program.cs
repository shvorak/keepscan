using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace KeepSpy.App
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((context, builder) => builder
                    .AddJsonFile("Settings/Settings.json")
                    .AddJsonFile($"Settings/Settings.{context.HostingEnvironment.EnvironmentName}.json", true)
                    .AddJsonFile("Settings/Settings.Local.json", true, true)
                    .AddEnvironmentVariables()
                )
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}