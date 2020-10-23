using KeepSpy.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KeepSpy.Storage.Configurations
{
    public class OperationViewSchema: IEntityTypeConfiguration<OperationView>
    {
        public void Configure(EntityTypeBuilder<OperationView> builder)
        {
            builder.HasKey(x => x.Tdt);
            builder.ToView("operation_view");
        }
    }
}