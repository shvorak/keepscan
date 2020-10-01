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

            CreateMap<Redeem, RedeemDto>()
                .ForMember(x => x.LotSize, opt => opt.MapFrom(x => x.Deposit.LotSize));

            CreateMap<Transaction, RedeemTxDto>()
                .ForMember(x => x.Status, opt => opt.MapFrom(x => x.RedeemStatus));
        }
    }
}