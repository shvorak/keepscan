import React from 'react'
import styles from 'components/deposit/log.css'
import { Address } from 'uikit/crypto/address'
import { DateTime } from 'uikit/display/datetime'
import { Heading } from 'uikit/typography'

export const Status = ({ children, ...props }) => (
    <Heading size={4} className={styles.status} {...props}>
        {children}
    </Heading>
)

export const Timestamp = ({ value }) => {
    return <DateTime value={value} className={styles.timestamp} />
}

export const Transaction = ({ tx, lastBlock }) => {
    if (null == tx) {
        return null
    }
    return (
        <>
            <Address value={tx.id} copy={false} kind="tx" className={styles.transaction} />
            {tx.kind === 1 && <Confirmations block={tx.block} lastBlock={lastBlock} />}
        </>
    )
}
const Confirmations = ({ block, lastBlock }) => {
    const count = lastBlock - block

    return count > 0 && <span className={styles.confirmations}> - {count} confirmations</span>
}
