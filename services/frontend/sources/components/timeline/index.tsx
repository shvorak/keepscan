import React from 'react'
import styles from 'components/deposit/log.css'
import { Address } from 'uikit/crypto/address'
import { DateTime } from 'uikit/display/datetime'
import { Heading } from 'uikit/typography'
import { Display } from 'uikit/typography/display'

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

    const suffix =
        tx.isError && tx.error ? (
            <Message message={tx.error} />
        ) : (
            <Confirmations block={tx.block} lastBlock={lastBlock} />
        )

    return (
        <>
            <Address value={tx.id} copy={false} kind="tx" className={styles.transaction} />
            {suffix}
        </>
    )
}

const Message = ({ message }) => (
    <>
        <Display size={14} inline secondary>&nbsp;-&nbsp;</Display>
        <Display error inline>
            {message}
        </Display>
    </>
)

const Confirmations = ({ block, lastBlock }) => {
    const count = lastBlock - block

    return count > 0 && <span className={styles.confirmations}> - {count} confirmations</span>
}
