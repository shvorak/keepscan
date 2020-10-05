import React, { FC } from 'react'
import { TimelineEvent } from 'uikit/display/timeline'
import { RedeemStatus } from 'entities/Redeem/constants'
import { formatStatus } from 'entities/Redeem/format'
import { filter, prop, sortBy } from 'ramda'
import { byStatus } from 'entities/Deposit/helpers'
import { isErrorStatus } from 'entities/Redeem/specs'
import { Status, Timestamp, Transaction } from 'components/timeline'
import { useSelector } from 'react-redux'
import { getNetworkLastBlock } from 'entities/Network/queries'
import { RedeemRespawn } from 'components/redeem/respawn'
import { Redeem } from 'entities/Redeem/types'

const SuccessOrder = [RedeemStatus.Requested, RedeemStatus.Signed, RedeemStatus.BtcTransferred, RedeemStatus.Redeemed]

const FailureOrder = [RedeemStatus.Requested, RedeemStatus.Liquidation, RedeemStatus.Liquidated]

const isStateComplete = (seekingStatus, currentStatus) => {
    return isErrorStatus(currentStatus)
        ? FailureOrder.indexOf(currentStatus) >= FailureOrder.indexOf(seekingStatus)
        : SuccessOrder.indexOf(currentStatus) >= SuccessOrder.indexOf(seekingStatus)
}

type RedeemLogProps = {
    redeem: Redeem
}

export const RedeemLog: FC<RedeemLogProps> = ({ redeem }) => {
    const failure = redeem.transactions.some((tx) => tx.status === RedeemStatus.Liquidation)
    const branch = failure ? FailureOrder : SuccessOrder

    const transactions = sortBy(prop('timestamp'), redeem.transactions || [])

    const events = branch.map((status) => {
        const statusTransactions = filter(byStatus(status), transactions)
        return statusTransactions.length > 0 ? (
            statusTransactions.map((tx) => <RedeemLogEvent key={tx.id} status={status} redeem={redeem} tx={tx} />)
        ) : (
            <RedeemLogEvent key={status} status={status} redeem={redeem} />
        )
    })

    return <div>{events}</div>
}

const RedeemLogEvent = ({ status, redeem, tx = null }) => {
    let icon
    let state = isStateComplete(status, redeem.status) ? 'complete' : 'feature'
    if (tx) {
        state = isErrorStatus(status) ? 'failure' : 'complete'
        if (false === tx.isError) {
            icon = 'check'
        }
    }

    const lastBlock = useSelector(getNetworkLastBlock(tx && tx.kind))

    const timestamp = tx && <Timestamp value={tx.timestamp} />
    const transaction = tx && <Transaction tx={tx} lastBlock={lastBlock} />
    return (
        // TODO: Fix `state` compiler error
        <TimelineEvent icon={icon} state={state as any} style="violet" key={status}>
            <div>
                <Status size={4}>{formatStatus(status)}</Status>
                {timestamp}
                <RedeemRespawn status={status} redeem={redeem} />
            </div>
            <div>{transaction}</div>
        </TimelineEvent>
    )
}
