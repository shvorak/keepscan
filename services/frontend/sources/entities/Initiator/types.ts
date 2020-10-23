
export type Initiator = {
    id: string
    redeemCount: number
    redeemAmount: number
    depositCount: number
    depositAmount: number
    lastSeenAt: string
}

export type InitiatorOperation = {
    tdt: string
    type: 'deposit' | 'redeem'
    lotSize: number
    senderAddress: string
    bitcoinAddress: string

    createdAt: string
    updatedAt: string
}
