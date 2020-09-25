using System;
using KeepSpy.App.Converters.Json;
using KeepSpy.App.Workers;
using KeepSpy.Storage;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace KeepSpy.App
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<KeepSpyContext>(builder => builder
                .UseNpgsql(Configuration.GetConnectionString("Default"))
            );
            
            services.AddMvcCore()
                .AddCors()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new DateTimeConverter());
                });

            services.AddSingleton(Configuration.GetSection("Workers:Bitcoin").Get<BitcoinWorkerOptions>());
            services.AddSingleton(Configuration.GetSection("Workers:Ethereum").Get<EthereumWorkerOptions>());

            services.AddHostedService<BitcoinWorker>();
            services.AddHostedService<EthereumWorker>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            using (var context = serviceProvider.GetService<KeepSpyContext>())
            {
                context.Database.Migrate();
            }
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseCors(builder => builder
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin()
                );
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}