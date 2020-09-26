
export interface Deposit
{
    id: string
    status: number
    senderAddress: string
    bitcoinAddress: string
    lotSize: number
    lotSizeFee: number
    lotSizeMinted: number

    createdAt: string
    updatedAt?: string
    completedAt?: string
}
