import { Redeem } from 'entities/Redeem/types'
import { find, prop, sortBy } from 'ramda'
import { byStatus } from 'entities/Deposit/helpers'
import { RedeemStatus } from 'entities/Redeem/constants'
import { isErrorStatus } from 'entities/Redeem/specs'

const SuccessOrder = [RedeemStatus.Requested, RedeemStatus.Signed, RedeemStatus.BtcTransferred, RedeemStatus.Redeemed]
const FailureOrder = [RedeemStatus.Liquidation, RedeemStatus.Liquidated]
const isStateBefore = (seekingStatus, currentStatus) => {
    isErrorStatus(currentStatus)
    return SuccessOrder.indexOf(currentStatus) >= SuccessOrder.indexOf(seekingStatus)
}
export const workflowFactory = (redeem: Redeem) => {
    const transactions = sortBy(prop('timestamp'), redeem.transactions || [])

    // Find liquidation tx
    const liquidation = find(byStatus(RedeemStatus.Liquidation), transactions)

    // When liquidation tx not found return "success way" status list
    if (null == liquidation) {
        return SuccessOrder
    }

    // Find last success step
    const lastSuccess = transactions.reduce((greatest, current) => {
        if (isErrorStatus(current.status)) {
            return greatest
        }
        return greatest === null || isStateBefore(greatest.status, current.status) ? current : greatest
    }, null)

    // We know what success tx already exists
    const lastSuccessIdx = SuccessOrder.indexOf(lastSuccess.status)

    // Slice "success way" list including last success tx
    return SuccessOrder.slice(0, lastSuccessIdx + 1).concat(FailureOrder)
}
