
export type Initiator = {
    id: string
    redeemedCount: number
    redeemedAmount: number
    mintedCount: number
    mintedAmount: number
    redeemsCount: number
    redeemsAmount: number
    depositsCount: number
    depositsAmount: number
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
