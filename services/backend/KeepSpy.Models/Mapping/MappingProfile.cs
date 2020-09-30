using AutoMapper;
using KeepSpy.Domain;

namespace KeepSpy.Models.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Deposit, DepositDto>();
            CreateMap<Transaction, DepositTxDto>();
        }
    }
}