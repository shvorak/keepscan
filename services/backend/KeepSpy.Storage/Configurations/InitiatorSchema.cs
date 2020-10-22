using KeepSpy.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KeepSpy.Storage.Configurations
{
    public class InitiatorSchema: IEntityTypeConfiguration<Initiator>
    {
        public void Configure(EntityTypeBuilder<Initiator> builder)
        {
            builder.HasNoKey();
            builder.ToView("initiator_view");
        }
    }
}