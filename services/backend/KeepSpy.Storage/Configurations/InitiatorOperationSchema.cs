using KeepSpy.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KeepSpy.Storage.Configurations
{
    public class InitiatorOperationSchema: IEntityTypeConfiguration<InitiatorOperationView>
    {
        public void Configure(EntityTypeBuilder<InitiatorOperationView> builder)
        {
            builder.HasNoKey();
            builder.ToView("operation_view");
        }
    }
}