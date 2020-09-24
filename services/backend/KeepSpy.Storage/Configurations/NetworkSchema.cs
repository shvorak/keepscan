using System;
using KeepSpy.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KeepSpy.Storage.Configurations
{
    public class NetworkSchema: IEntityTypeConfiguration<Network>
    {
        public void Configure(EntityTypeBuilder<Network> builder)
        {
            builder.HasData(new Network()
            {
                Id = new Guid("BF9C69D8-7FB5-4287-A41C-4D74EF7FEA80"),
                Name = "Ropsten",
                Kind = NetworkKind.Ethereum,
                IsTestnet = true,
                LastBlock = 8594983,
                LastBlockAt = DateTime.MinValue
            });
            
            builder.HasData(new Network()
            {
                Id = new Guid("ED3664ED-5911-403D-870A-A60491ABB660"),
                Name = "Bitcoin Testnet",
                Kind = NetworkKind.Bitcoin,
                IsTestnet = true,
                LastBlock = 0,
                LastBlockAt = DateTime.MinValue
            });
        }
    }
}