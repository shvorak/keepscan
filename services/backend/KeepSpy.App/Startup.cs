using System;
using System.IO;
using System.Reflection;
using AutoMapper;
using KeepSpy.App.Blockstream;
using KeepSpy.App.Converters.Json;
using KeepSpy.App.Services;
using KeepSpy.App.Workers;
using KeepSpy.Models;
using KeepSpy.Models.Mapping;
using KeepSpy.Storage;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace KeepSpy.App
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var bitcoinOptions = Configuration.GetSection("Workers:Bitcoin").Get<BitcoinWorkerOptions>();
            var ethereumOptions = Configuration.GetSection("Workers:Ethereum").Get<EthereumWorkerOptions>();
            
            services.AddDbContext<KeepSpyContext>(builder => builder
                .UseNpgsql(Configuration.GetConnectionString("Default"))
            );

            services.AddMvcCore()
                .AddCors()
                .AddJsonOptions(options => { options.JsonSerializerOptions.Converters.Add(new DateTimeConverter()); })
                .AddApiExplorer();

            services.AddAutoMapper(config => { config.AddProfile<MappingProfile>(); });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "KeepScan API",
                    Description = "A quick and clear API for getting information about the Keep Network.",
                    Contact = new OpenApiContact
                    {
                        Name = "Github",
                        Url = new Uri("https://github.com/emerido/keepscan"),
                    },
                });
                
                c.DescribeAllParametersInCamelCase();
                c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, "KeepSpy.App.xml"));
            });

            services.AddHttpClient<KeychainService>(client =>
            {
                client.BaseAddress = new Uri("http://keepscan.com:50030");
            });

            // TODO: Rename Client ti BlockstreamClient
            services.AddHttpClient<Client>(client =>
            {
                client.BaseAddress = new Uri(bitcoinOptions.ApiUrl);
            });

            services.AddSingleton(bitcoinOptions);
            services.AddSingleton(ethereumOptions);
           
            services.AddHostedService<BitcoinWorker>();
            services.AddHostedService<EthereumWorker>();
            services.AddHostedService<RefreshViewWorker>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            using (var context = serviceProvider.GetService<KeepSpyContext>())
            {
                context.Database.Migrate();
            }

            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin()
            );

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.DocumentTitle = "KeepScan API";
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "KeepScan v1");
            });

            app.UseRouting();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}