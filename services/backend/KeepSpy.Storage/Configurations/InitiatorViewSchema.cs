using KeepSpy.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KeepSpy.Storage.Configurations
{
    public class InitiatorViewSchema: IEntityTypeConfiguration<InitiatorView>
    {
        public void Configure(EntityTypeBuilder<InitiatorView> builder)
        {
            builder.HasNoKey();
            builder.ToView("initiator_view");
        }
    }
}