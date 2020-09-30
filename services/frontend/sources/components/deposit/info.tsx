import React from 'react'
import styles from './info.css'
import { Amount } from 'uikit/crypto/amount'

export const DepositInfo = ({deposit}) => {
    return (
        <Info>
            <Item label="Initiator" value={deposit.senderAddress} />
            <Item label="tBTC contract" value={deposit.contractId} />
            <Item label="Lot size" value={<Amount value={deposit.lotSize} />} />
            <Item label="Lot size fee" value={<Amount value={deposit.lotSizeFee} precision={10} />} />
            <Item label="Lot size minted" value={<Amount value={deposit.lotSizeMinted} precision={10} />} />
            <Item label="Bitcoin deposit address" value={deposit.bitcoinAddress || 'none'} />
            <Item label="Bitcoin funded block" value={deposit.bitcoinFundedBlock || 'none'} />
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
