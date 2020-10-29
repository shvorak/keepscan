using KeepSpy.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KeepSpy.Storage.Configurations
{
	public class BondEventSchema : IEntityTypeConfiguration<BondEvent>
    {
        public void Configure(EntityTypeBuilder<BondEvent> builder)
        {
            builder.HasIndex(x => x.SignerId);
            builder.HasKey(x => new { x.LogIndex, x.TransactionId });
        }
    }
}
