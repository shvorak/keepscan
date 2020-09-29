/**
 * InitiatingDeposit,
 WaitingForBtc,
 BtcReceived,
 SubmittingProof,
 ApprovingSpendLimit,
 Minted,
 Redeemed,
 SetupFailed,
 Liquidated
 */
export const DepositStatus = {
    InitiatingDeposit: 0,
    WaitingForBtc: 1,
    BtcReceived: 2,
    SubmittingProof: 3,
    ApprovingTdtSpendLimit: 4,
    Minted: 5,
    Redeemed: 6,
    SetupFailed: 7,
    Liquidated: 8
}

export const DepositStatusNames = {
    [DepositStatus.InitiatingDeposit]: 'Initiating deposit',
    [DepositStatus.WaitingForBtc]: 'Waiting for BTC',
    [DepositStatus.BtcReceived]: 'BTC received',
    [DepositStatus.SubmittingProof]: 'Submitting proof',
    [DepositStatus.ApprovingTdtSpendLimit]: 'Approving spend limit',
    [DepositStatus.Minted]: 'Minted',
    [DepositStatus.Redeemed]: 'Redeemed',
}
