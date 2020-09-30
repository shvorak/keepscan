import React from 'react'
import styles from './info.css'
import { Amount } from 'uikit/crypto/amount'
import { Address } from 'uikit/crypto/address'
import { DateTime } from 'uikit/display/datetime'

export const DepositInfo = ({deposit}) => {
    return (
        <Info>
            <Item label="Initiator" value={<Address value={deposit.senderAddress} full />} />
            <Item label="tBTC contract" value={<Address value={deposit.contractId} full />} />
            <Item label="Lot size" value={<Amount value={deposit.lotSize} />} />
            <Item label="Lot size fee" value={<Amount value={deposit.lotSizeFee} precision={10} />} />
            <Item label="Lot size minted" value={<Amount value={deposit.lotSizeMinted} precision={10} />} />
            <Item label="Bitcoin deposit address" value={<Address color="brass" value={deposit.bitcoinAddress} full />} />
            <Item label="Bitcoin funded block" value={deposit.bitcoinFundedBlock} />
            <Item label="Initiated" value={<DateTime value={deposit.createdAt} />} />
            <Item label="Updated" value={<DateTime value={deposit.updatedAt} />} />
            <Item label="Completed" value={<DateTime value={deposit.completedAt} />} />
        </Info>
    )
}



const Info = ({children}) => (
    <div className={styles.info}>
        {children}
    </div>
)

const Item = ({label, value}) => (
    <div className={styles.item}>
        <div className={styles.label}>{label}:</div>
        <div className={styles.value}>{value}</div>
    </div>
)
