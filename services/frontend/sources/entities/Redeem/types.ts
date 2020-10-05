import { RedeemStatus } from 'entities/Redeem/constants'
type ValueOf<T> = T[keyof T]

export type Redeem = {
    id: string
    status: ValueOf<typeof RedeemStatus>
    depositId: string

    senderAddress: string
    bitcoinAddress?: string
    bitcoinRedeemedBlock?: number

    lotSize: number
    btcFee?: number
    btcRedeemed?: number

    createdAt: string
    updatedAt: string
    completedAt: string

    transactions: RedeemTx[]
}

export interface RedeemTx
{
    id: string
    block: number
    status: number
    timestamp: number
    isError: boolean
    error: string
}
