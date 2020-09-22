using KeepSpy.Storage.Extensions;
using Microsoft.EntityFrameworkCore;

namespace KeepSpy.Storage
{
    public class KeepSpyContext : DbContext
    {
        public KeepSpyContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
            modelBuilder.ApplyPostgresConventions();
        }
    }
}