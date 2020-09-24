
export interface Deposit
{
    id: string
    senderAddress: string
    bitcoinAddress: string
    lotSize: number
    lotSizeFee: number
    lotSizeMinted: number

    createdAt: string
    updatedAt?: string
    completedAt?: string
}