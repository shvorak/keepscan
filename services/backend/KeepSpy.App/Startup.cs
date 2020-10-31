using System;
using System.IO;
using System.Reflection;
using AutoMapper;
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
                    Description = "Simple API for reading TBTC status",
                    Contact = new OpenApiContact
                    {
                        Name = "Shvorak Alexey",
                        Email = "alex@shvorak.com",
                        Url = new Uri("https://github.com/emerido"),
                    },
                });
                
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            services.AddHttpClient<KeychainService>(client =>
            {
                client.BaseAddress = new Uri("http://keepscan.com:50030");
            });

            services.AddSingleton(Configuration.GetSection("Workers:Bitcoin").Get<BitcoinWorkerOptions>());
            services.AddSingleton(Configuration.GetSection("Workers:Ethereum").Get<EthereumWorkerOptions>());

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
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "KeepScan v1"); });

            app.UseRouting();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}