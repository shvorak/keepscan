import { DepositTx } from 'entities/Deposit/types'
import { isErrorStatus } from 'entities/Deposit/specs'

export const buildStatuses = (statuses: number[], transactions: DepositTx[]) => {
    const result = []

    const hasError = transactions.some((tx) => isErrorStatus(tx.status))

    if (hasError) {
        transactions.forEach((tx) => result.push(tx.status))
    } else {
        result.push(...statuses)
    }

    return result
}
export const byStatus = (status: number) => (tx: DepositTx) => tx.status === status
