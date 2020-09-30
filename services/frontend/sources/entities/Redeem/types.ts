import { RedeemStatus } from 'entities/Redeem/constants'
type ValueOf<T> = T[keyof T]

export type Redeem = {
    id: string
    status: ValueOf<typeof RedeemStatus>
    depositId: string

    senderAddress: string
    bitcoinAddress?: string
    bitcoinRedeemedBlock?: number

    btcFee?: number
    btcRedeemed?: number

    createdAt: string
    updatedAt: string
    completedAt: string
}
