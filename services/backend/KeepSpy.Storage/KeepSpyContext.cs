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

            modelBuilder.Entity<Bond>()
             .HasKey(t => new { t.DepositId, t.SignerId });

            modelBuilder.Entity<Bond>()
                .HasOne(pt => pt.Deposit)
                .WithMany(p => p.Bonds)
                .HasForeignKey(ds => ds.DepositId);

            modelBuilder.Entity<Bond>()
                .HasOne(pt => pt.Signer)
                .WithMany(t => t.Bonds)
                .HasForeignKey(pt => pt.SignerId);

            modelBuilder.Entity<CurrencyRate>()
                .HasKey(t => new { t.Timestamp, t.TradePair, t.Source });
            
            // This line must be below of any other code
            modelBuilder.ApplyPostgresConventions();
        }
    }
}