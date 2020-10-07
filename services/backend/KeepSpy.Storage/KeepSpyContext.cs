using KeepSpy.Domain;
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
            
            modelBuilder.Entity<DepositSigner>()
             .HasKey(t => new { t.DepositId, t.SignerId });

            modelBuilder.Entity<DepositSigner>()
                .HasOne(pt => pt.Deposit)
                .WithMany(p => p.Signers)
                .HasForeignKey(ds => ds.DepositId);

            modelBuilder.Entity<DepositSigner>()
                .HasOne(pt => pt.Signer)
                .WithMany(t => t.Deposits)
                .HasForeignKey(pt => pt.SignerId);
        }
    }
}