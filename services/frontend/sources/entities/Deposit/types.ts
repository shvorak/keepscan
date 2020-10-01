
export interface Deposit
{
    id: string
    status: number
    senderAddress: string
    bitcoinAddress: string
    lotSize: number
    lotSizeFee: number
    lotSizeMinted: number
    bitcoinFundedBlock?: number

    createdAt: string
    updatedAt?: string
    completedAt?: string

    transactions: DepositTx[]
}

export interface DepositTx
{
    id: string
    block: number
    status: number
    timestamp: number
    isError: boolean
}
