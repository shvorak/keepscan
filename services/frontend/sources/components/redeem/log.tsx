import React, { FC, useMemo } from 'react'
import { TimelineEvent } from 'uikit/display/timeline'
import { formatStatus } from 'entities/Redeem/format'
import { filter } from 'ramda'
import { byStatus } from 'entities/Deposit/helpers'
import { isErrorStatus } from 'entities/Redeem/specs'
import { Status, Timestamp, Transaction, TransactionData } from 'components/timeline'
import { useSelector } from 'react-redux'
import { getNetworkLastBlock } from 'entities/Network/queries'
import { RedeemRespawn } from 'components/redeem/respawn'
import { Redeem } from 'entities/Redeem/types'
import { workflowFactory } from 'entities/Redeem/helpers'

type RedeemLogProps = {
    redeem: Redeem
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
