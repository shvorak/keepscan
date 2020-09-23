using System;
using KeepSpy.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KeepSpy.Storage.Configurations
{
    public class ContractsSchema: IEntityTypeConfiguration<Contract>
    {
        public void Configure(EntityTypeBuilder<Contract> builder)
        {
            builder.HasData(new Contract
            {
                Id = "0x4CEE725584e38413603373C9D5df593a33560293",
                NetworkId = new Guid("BF9C69D8-7FB5-4287-A41C-4D74EF7FEA80"),
                Active = true,
                Name = "Deposit Factory",
            });
        }
    }
}