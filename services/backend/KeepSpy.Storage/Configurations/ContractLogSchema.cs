using KeepSpy.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KeepSpy.Storage.Configurations
{
	public class ContractLogSchema : IEntityTypeConfiguration<ContractLog>
    {
        public void Configure(EntityTypeBuilder<ContractLog> builder)
        {
            builder.HasIndex(x => x.TransactionId);
            builder.HasIndex(x => x.Address);
            builder.HasIndex(x => x.Topic0);
            builder.HasKey(x => new { x.TransactionId, x.LogIndex });
        }
    }
}
