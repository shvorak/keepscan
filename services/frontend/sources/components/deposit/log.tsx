import React, { FC, useMemo } from 'react'
import styles from './log.css'
import { Heading } from 'uikit/typography'
import { formatStatus } from 'entities/Deposit/format'
import { DepositStatus } from 'entities/Deposit/constants'
import { DateTime } from 'uikit/display/datetime'
import { useClasses } from 'shared/hooks/styles'
import { find } from 'ramda'
import { Deposit } from 'entities/Deposit/types'
import { Address } from 'uikit/crypto/address'

type DepositLogProps = {
    deposit: Deposit
}

export const DepositLog: FC<DepositLogProps> = ({ deposit }) => {
    const statuses = useMemo(() => {
        return Object.values(DepositStatus).map((status) => {
            const tx = find(x => x.status === status, deposit.transactions || [])
            return <DepositLogRecord key={status} status={status} deposit={deposit} transaction={tx} />
        })
    }, [deposit])

    return <div>{statuses}</div>
}

export const DepositLogRecord = ({ status, deposit, transaction = null }) => {
    const date = transaction && <DateTime value={transaction.timestamp} className={styles.timestamp} />
    const addr = transaction && <Address value={transaction.id} />
    const props = useMemo(() => {
        return {
            state: status <= deposit.status ? 'complete' : 'feature'
        }
    }, [status, deposit, transaction])

    const className = useClasses(styles, 'item', props)
    return (
        <div className={className}>
            <div className={styles.legend}>
                <div>
                    <Heading size={4} className={styles.status}>{formatStatus(status)}</Heading>
                    {date}
                </div>
                {addr}
            </div>
        </div>
    )
}
