
export type Initiator = {
    id: string
    redeemCount: number
    redeemAmount: number
    depositCount: number
    depositAmount: number
    lastSeenAt: string
}

export type InitiatorOperation = {
    id: string
    type: 'deposit' | 'redeem'
    senderAddress: string
    bitcoinAddress: string
    
    createdAt: string
    updatedAt: string
}
