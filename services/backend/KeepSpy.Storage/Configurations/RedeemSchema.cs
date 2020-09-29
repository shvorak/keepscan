using KeepSpy.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KeepSpy.Storage.Configurations
{
    public class RedeemSchema : IEntityTypeConfiguration<Redeem>
    {
        public void Configure(EntityTypeBuilder<Redeem> builder)
        {

        }
    }
}