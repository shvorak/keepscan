using KeepSpy.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KeepSpy.Storage.Configurations
{
	public class StakeEventSchema : IEntityTypeConfiguration<StakeEvent>
    {
        public void Configure(EntityTypeBuilder<StakeEvent> builder)
        {
            builder.HasIndex(x => x.SignerId);
            builder.HasKey(x => new { x.LogIndex, x.TransactionId });
        }
    }
}
