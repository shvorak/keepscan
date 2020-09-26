
export const DepositStatus = {
    GettingBtcAddress: 1,
    BtcAddressGenerated: 2,
    BtcReceived: 3,
    SubmittingProof: 4,
    ApprovingTdtSpendLimit: 5,
    Minted: 6
}

export const DepositStatusNames = {
    [DepositStatus.GettingBtcAddress]: 'Getting BTC address',
    [DepositStatus.BtcAddressGenerated]: 'BTC address generated',
    [DepositStatus.BtcReceived]: 'BTC received',
    [DepositStatus.SubmittingProof]: 'Submitting proof',
    [DepositStatus.ApprovingTdtSpendLimit]: 'Approving spend limit',
    [DepositStatus.Minted]: 'Minted',
}
