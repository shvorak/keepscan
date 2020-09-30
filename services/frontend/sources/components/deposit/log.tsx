import React, { useMemo } from 'react'
import styles from './log.css'
import { Heading } from 'uikit/typography'
import { formatStatus } from 'entities/Deposit/format'
import { DepositStatus } from 'entities/Deposit/constants'
import { Display } from 'uikit/typography/display'
import { DateTime } from 'uikit/display/datetime'

const Tx = {
    id: '0x4CEE725584e38413603373C9D5df593a33560293',
    timestamp: '2020-09-29T11:50:24Z'
}

export const DepositLog = ({ deposit }) => {
    const statuses = useMemo(() => {
        return Object.values(DepositStatus).map((status) => {
            return <DepositLogRecord key={status} status={status} deposit={deposit} transaction={Tx} />
        })
    }, [deposit])
    return <div>{statuses}</div>
}

export const DepositLogRecord = ({ status, deposit, transaction = null }) => {
    const date = transaction && <DateTime value={transaction.timestamp} />
    return (
        <div className={styles.item}>
            <div className={styles.legend}>
                <Heading size={4}>{formatStatus(status)}</Heading>
                {date}
            </div>
        </div>
    )
}
