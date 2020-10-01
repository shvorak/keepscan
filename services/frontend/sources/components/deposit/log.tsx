import React, { FC, useMemo } from 'react'
import styles from './log.css'
import { Heading } from 'uikit/typography'
import { formatStatus } from 'entities/Deposit/format'
import { DepositStatus } from 'entities/Deposit/constants'
import { DateTime } from 'uikit/display/datetime'
import { useClasses } from 'shared/hooks/styles'
import { find, prop, sortBy } from 'ramda'
import { Deposit } from 'entities/Deposit/types'
import { Address } from 'uikit/crypto/address'
import { useSelector } from 'react-redux'
import { getEthereumLastBlock } from 'entities/Network/queries'
import { isErrorStatus } from 'entities/Deposit/specs'
import { buildStatuses, byStatus } from 'entities/Deposit/helpers'
import { Respawn } from 'components/deposit/respawn'
import { TimelineEvent } from 'uikit/display/timeline'
import { DisplayLink } from 'uikit/typography/display'

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
            const tx = find(byStatus(status), transactions)
            return <DepositLogRecord key={status} status={status} deposit={deposit} tx={tx} />
        })
    }, [deposit])

    return <div>{statuses}</div>
}

export const DepositLogRecord = ({ status, deposit, tx = null }) => {
    const lastBlock = useSelector(getEthereumLastBlock)

    const timestamp = tx && <DateTime value={tx.timestamp} className={styles.timestamp} />
    const transaction = tx && <Transaction tx={tx} lastBlock={lastBlock} />
    const respawn = status === deposit.status && <Respawn deposit={deposit} />

    const redeem = status === deposit.status && status === DepositStatus.Redeemed && (
        <DisplayLink to={`/redeems/${deposit.id}`} className={styles.redeemLink}>Open redeem operation</DisplayLink>
    )

    const state = status <= deposit.status ? (isErrorStatus(status) ? 'failure' : 'complete') : 'feature'

    return (
        <TimelineEvent state={state}>
            <div className={styles.inline}>
                <Heading size={4} className={styles.status}>
                    {formatStatus(status)}
                </Heading>
                {timestamp}
                {respawn}
            </div>
            <div className={styles.inline}>
                {transaction}
                {redeem}
            </div>
        </TimelineEvent>
    )
}

const Transaction = ({ tx, lastBlock }) => {
    if (null == tx) {
        return null
    }
    return (
        <>
            <Address value={tx.id} copy={false} kind="tx" className={styles.transaction} />
            <Confirmations block={tx.block} lastBlock={lastBlock} />
        </>
    )
}

const Confirmations = ({ block, lastBlock }) => {
    const count = lastBlock - block

    return count > 0 && <span className={styles.confirmations}> - {count} confirmations</span>
}
