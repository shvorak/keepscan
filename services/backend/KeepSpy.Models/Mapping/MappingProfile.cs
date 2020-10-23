using System.Linq;
using AutoMapper;
using KeepSpy.Domain;

namespace KeepSpy.Models.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Deposit, DepositDto>();
            CreateMap<Deposit, DepositDetailsDto>()
                .ForMember(x => x.SpentFee, opt => opt.Ignore())
                .ForMember(x => x.Signers, opt => opt.MapFrom(x => x.Signers.Select(s => s.SignerId)))
                .ForMember(x => x.DepositTokenContract,
                    opt => opt.MapFrom(x => "0x10b66bd1e3b5a936b7f8dbc5976004311037cdf0"));

            CreateMap<Redeem, RedeemDto>()
                .ForMember(x => x.LotSize, opt => opt.MapFrom(x => x.Deposit.LotSize));

            CreateMap<Redeem, RedeemDetailsDto>()
                .IncludeBase<Redeem, RedeemDto>()
                .ForMember(x => x.BitcoinWithdrawalAddress, opt => opt.MapFrom(x => x.Deposit.BitcoinAddress))
                .ForMember(x => x.HonestThreshold, opt => opt.MapFrom(x => x.Deposit.HonestThreshold))
                .ForMember(x => x.SpentFee, opt => opt.Ignore())
                .ForMember(x => x.TokenId, opt => opt.MapFrom(x => x.Deposit.TokenID))
                .ForMember(x => x.Signers, opt => opt.MapFrom(x => x.Deposit.Signers.Select(s => s.SignerId)))
                .ForMember(x => x.DepositTokenContract,
                    opt => opt.MapFrom(x => "0x10b66bd1e3b5a936b7f8dbc5976004311037cdf0"));

            CreateMap<Transaction, DepositTxDto>();
            CreateMap<Transaction, RedeemTxDto>()
                .ForMember(x => x.Status, opt => opt.MapFrom(x => x.RedeemStatus));

            CreateMap<OperationView, OperationDto>();
        }
    }
}