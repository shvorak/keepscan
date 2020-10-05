import React, { FC, useMemo } from 'react'
import { TimelineEvent } from 'uikit/display/timeline'
import { RedeemStatus } from 'entities/Redeem/constants'
import { formatStatus } from 'entities/Redeem/format'
import { filter, find, prop, sortBy } from 'ramda'
import { byStatus } from 'entities/Deposit/helpers'
import { isErrorStatus } from 'entities/Redeem/specs'
import { Status, Timestamp, Transaction, TransactionData } from 'components/timeline'
import { useSelector } from 'react-redux'
import { getNetworkLastBlock } from 'entities/Network/queries'
import { RedeemRespawn } from 'components/redeem/respawn'
import { Redeem } from 'entities/Redeem/types'

const SuccessOrder = [RedeemStatus.Requested, RedeemStatus.Signed, RedeemStatus.BtcTransferred, RedeemStatus.Redeemed]

const FailureOrder = [RedeemStatus.Liquidation, RedeemStatus.Liquidated]

const isStateBefore = (seekingStatus, currentStatus) => {
    isErrorStatus(currentStatus)
    return SuccessOrder.indexOf(currentStatus) >= SuccessOrder.indexOf(seekingStatus)
}

type RedeemLogProps = {
    redeem: Redeem
}

const workflowFactory = (redeem: Redeem) => {
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

export const RedeemLog: FC<RedeemLogProps> = ({ redeem }) => {
    const items = useMemo(() => {
        const workflow = workflowFactory(redeem)
        const transactions = redeem.transactions || []

        return workflow.map((status) => {
            const state =
                workflow.indexOf(redeem.status) >= workflow.indexOf(status)
                    ? isErrorStatus(status)
                        ? 'failure'
                        : 'complete'
                    : 'feature'

            const render = (tx = null) => (
                <RedeemLogEvent key={tx ? tx.id : status} state={state} status={status} redeem={redeem} tx={tx} />
            )

            const statusTransactions = filter(byStatus(status), transactions)

            // prettier-ignore
            return statusTransactions.length > 0
                ? statusTransactions.map(render)
                : render()
        })
    }, [redeem])

    return <div>{items}</div>
}

const RedeemLogEvent = ({ state, status, redeem, tx = null }) => {
    let icon
    if (tx && false === tx.isError) {
        // Special keys for liquidation flow
        icon = 'check'
    }

    const lastBlock = useSelector(getNetworkLastBlock(tx && tx.kind))

    const timestamp = tx && <Timestamp value={tx.timestamp} />
    const transaction = tx && <Transaction tx={tx} lastBlock={lastBlock} />
    const transactionData = tx && <TransactionData tx={tx} />

    return (
        // TODO: Fix `state` compiler error
        <TimelineEvent icon={icon} state={state as any} style="violet" key={status}>
            <div>
                <Status size={4}>{formatStatus(status)}</Status>
                {timestamp}
                <RedeemRespawn status={status} redeem={redeem} />
            </div>
            <div>{transaction}</div>
            {transactionData}
        </TimelineEvent>
    )
}
