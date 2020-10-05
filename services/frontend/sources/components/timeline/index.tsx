import React, { FC } from 'react'
import styles from 'components/deposit/log.less'
import { Address } from 'uikit/crypto/address'
import { DateTime } from 'uikit/display/datetime'
import { Heading } from 'uikit/typography'
import { Display } from 'uikit/typography/display'
import { Number } from 'uikit/display/number'
import { DepositTx } from 'entities/Deposit/types'
import { RedeemTx } from 'entities/Redeem/types'
import { CURRENCY_CODES } from 'entities/Network/constants'

type TransactionDataProps = {
    tx: DepositTx | RedeemTx
}

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

export const TransactionData: FC<TransactionDataProps> = ({ tx }) => {
    const suffix = ' ' + CURRENCY_CODES[tx.kind]

    const items = [
        tx.amount && (
            <div key="amount" className={styles.item}>
                <Display className={styles.label}>Value:</Display>
                <Number className={styles.value} value={tx.amount} precision={6} suffix={suffix} />
            </div>
        ),
        tx.fee && (
            <div key="fee" className={styles.item}>
                <Display className={styles.label}>Fee:</Display>
                <Number className={styles.value} value={tx.fee} precision={6} suffix={suffix} />
            </div>
        ),
    ].filter(Boolean)

    return <div className={styles.details}>{items}</div>
}

const Message = ({ message }) => (
    <>
        <Display size={14} inline secondary>
            &nbsp;-&nbsp;
        </Display>
        <Display error inline>
            {message}
        </Display>
    </>
)

const Confirmations = ({ block, lastBlock }) => {
    const count = lastBlock - block

    return count > 0 && <span className={styles.confirmations}> - {count} confirmations</span>
}
