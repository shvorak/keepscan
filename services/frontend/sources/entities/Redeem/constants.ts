export const RedeemStatus = {
    Requested: 0,
    Signed: 1,
    Redeemed: 2,
    Liquidation: 3,
    Liquidated: 4,
    BtcTransferred: 5
}


export const RedeemStatusNames = {
    [RedeemStatus.Requested]: 'Requested',
    [RedeemStatus.Signed]: 'Signed',
    [RedeemStatus.Redeemed]: 'Redeemed',
    [RedeemStatus.Liquidation]: 'Liquidation',
    [RedeemStatus.Liquidated]: 'Liquidated',
    [RedeemStatus.BtcTransferred]: 'BTC transferred',
}

export const RedeemFailureStatuses = [
    RedeemStatus.Liquidation,
    RedeemStatus.Liquidated
]
