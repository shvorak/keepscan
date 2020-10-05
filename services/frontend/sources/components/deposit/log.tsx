import React, { FC, useMemo } from 'react'
import styles from './log.less'
import { formatStatus } from 'entities/Deposit/format'
import { DepositStatus } from 'entities/Deposit/constants'
import { filter, prop, sortBy } from 'ramda'
import { Deposit } from 'entities/Deposit/types'
import { useSelector } from 'react-redux'
import { getNetworkLastBlock } from 'entities/Network/queries'
import { isErrorStatus } from 'entities/Deposit/specs'
import { buildStatuses, byStatus } from 'entities/Deposit/helpers'
import { Respawn } from 'components/deposit/respawn'
import { TimelineEvent } from 'uikit/display/timeline'
import { DisplayLink } from 'uikit/typography/display'
import { Status, Timestamp, Transaction, TransactionData } from 'components/timeline'

type DepositLogProps = {
    deposit: Deposit
}

const DepositStatusOrder = [
    DepositStatus.InitiatingDeposit,
    DepositStatus.WaitingForBtc,
    DepositStatus.BtcReceived,
    DepositStatus.SubmittingProof,
    DepositStatus.ApprovingTdtSpendLimit,
    DepositStatus.Minted,
    DepositStatus.Redeemed,
]

export const DepositLog: FC<DepositLogProps> = ({ deposit }) => {
    const statuses = useMemo(() => {
        const transactions = sortBy(prop('timestamp'), deposit.transactions || [])
        return buildStatuses(DepositStatusOrder, transactions).map((status) => {
            const statusTransactions = filter(byStatus(status), transactions)

            return statusTransactions.length ? (
                statusTransactions.map(tx => {
                    return <DepositLogRecord key={tx.id} status={status} deposit={deposit} tx={tx} />
                })
            ) : (
                <DepositLogRecord key={status} status={status} deposit={deposit} />
            )
        })
    }, [deposit])

    return <div>{statuses}</div>
}

export const DepositLogRecord = ({ status, deposit, tx = null }) => {
    const lastBlock = useSelector(getNetworkLastBlock(tx && tx.kind))

    const timestamp = tx && <Timestamp value={tx.timestamp} />
    const transaction = tx && <Transaction tx={tx} lastBlock={lastBlock} />
    const transactionData = tx && <TransactionData tx={tx} />
    const respawn = status === deposit.status && <Respawn deposit={deposit} />

    const redeem = status === deposit.status && status === DepositStatus.Redeemed && (
        <DisplayLink to={`/redeems/${deposit.id}`} className={styles.redeemLink}>
            Open redeem operation
        </DisplayLink>
    )

    const state =
        status <= deposit.status ? (isErrorStatus(status) || (tx && tx.isError) ? 'failure' : 'complete') : 'feature'

    return (
        <TimelineEvent state={state}>
            <div className={styles.inline}>
                <Status>{formatStatus(status)}</Status>
                {timestamp}
                {respawn}
            </div>
            <div className={styles.inline}>
                {transaction}
                {redeem}
            </div>
            {transactionData}
        </TimelineEvent>
    )
}

