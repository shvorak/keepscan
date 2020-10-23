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
            builder.HasDiscriminator(x => x.Type)
                .HasValue<OperationRedeemView>("redeem")
                .HasValue<OperationDepositView>("deposit")
                ;
            builder.ToView("operation_view");
        }
    }
}