using AutoMapper;
using KeepSpy.Domain;

namespace KeepSpy.Models.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Deposit, DepositDto>();
            CreateMap<Deposit, DepositDetailsDto>()
                .ForMember(x => x.SpentFee, opt => opt.Ignore());

            CreateMap<Redeem, RedeemDto>()
                .ForMember(x => x.LotSize, opt => opt.MapFrom(x => x.Deposit.LotSize));
            
            CreateMap<Redeem, RedeemDetailsDto>()
                .IncludeBase<Redeem, RedeemDto>()
                .ForMember(x => x.BitcoinWithdrawalAddress, opt => opt.MapFrom(x => x.Deposit.BitcoinAddress))
                .ForMember(x => x.SpentFee, opt => opt.Ignore());
            
            CreateMap<Transaction, DepositTxDto>();
            CreateMap<Transaction, RedeemTxDto>()
                .ForMember(x => x.Status, opt => opt.MapFrom(x => x.RedeemStatus));
        }
    }
}