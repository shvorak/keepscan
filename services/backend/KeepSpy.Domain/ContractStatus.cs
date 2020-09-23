namespace KeepSpy.Domain
{
    public enum ContractStatus
    {
        Start,
        AwaitingSignerSetup,
        AwaitingBtcFundingProof,
        FailedSetup,
        Active,
        AwaitingWithdrawalSignature,
        AwaitingWithdrawalProof,
        Redeemed,
        CourtesyCall,
        FraudLiquidationInProgress,
        LiquidationInProgress,
        Liquidated
    }
}