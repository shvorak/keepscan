import React from 'react'
import { TimelineEvent } from 'uikit/display/timeline'
import { RedeemStatus } from 'entities/Redeem/constants'
import { Heading } from 'uikit/typography'
import { formatStatus } from 'entities/Redeem/format'
import { find, prop, sortBy } from 'ramda'
import { byStatus } from 'entities/Deposit/helpers'
import { isErrorStatus } from 'entities/Redeem/specs'
import { Status, Timestamp, Transaction } from 'components/timeline'
import { useSelector } from 'react-redux'
import { getEthereumLastBlock } from 'entities/Network/queries'
import { Respawn } from 'components/deposit/respawn'
import { RedeemRespawn } from 'components/redeem/respawn'

const SuccessOrder = [
    RedeemStatus.Requested,
    RedeemStatus.Signed,
    RedeemStatus.Redeemed,
]

const FailureOrder = [
    RedeemStatus.Requested,
    RedeemStatus.Liquidation,
    RedeemStatus.Liquidated
]

export const RedeemLog = ({ redeem }) => {
    const failure = redeem.transactions.some(tx => tx.status === RedeemStatus.Liquidation)
    const branch = failure ? FailureOrder : SuccessOrder

    const transactions = sortBy(prop('timestamp'), redeem.transactions || [])

    const events = branch.map(status => {
        const tx = find(byStatus(status), transactions)
        return <RedeemLogEvent status={status} redeem={redeem} tx={tx} />
    })

    return (
        <div>
            {events}
        </div>
    )
}

const RedeemLogEvent = ({status, redeem, tx}) => {
    let state = 'feature'
    if (tx) {
        state = isErrorStatus(status) ? 'failure' : 'complete'
    }

    const lastBlock = useSelector(getEthereumLastBlock)

    const timestamp = tx && <Timestamp value={tx.timestamp} />
    const transaction = tx && <Transaction tx={tx} lastBlock={lastBlock} />
    return (
        // TODO: Fix `state` compiler error
        <TimelineEvent state={state as any} style="violet" key={status}>
            <div>
                <Status size={4}>{formatStatus(status)}</Status>
                {timestamp}
                <RedeemRespawn status={status} redeem={redeem} />
            </div>
            <div>
                {transaction}
            </div>
        </TimelineEvent>
    )
}
