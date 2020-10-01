import React, { useMemo } from 'react'
import styles from './info.css'
import { address, amount, datetime } from 'components/deposit/info.fields'

const field = (name, options) => ({
    name,
    options,
})

const Schema = [
    field('senderAddress', {
        label: 'Initiator',
        render: address
    }),
    field('contractId', {
        label: 'tBTC contract',
        render: address
    }),
    field('lotSize', {
        label: 'Lot size',
        render: amount
    }),
    field('lotSizeFee', {
        label: 'Lot size fee',
        render: amount
    }),
    field('lotSizeMinted', {
        label: 'Lot size minted',
        render: amount
    }),
    field('bitcoinAddress', {
        label: 'Bitcoin deposit address',
        render: address,
        payload: {
            color: 'brass'
        }
    }),
    field('bitcoinFundedBlock', {
        label: 'Bitcoin funded block'
    }),
    field('createdAt', {
        label: 'Initiated',
        render: datetime
    }),
    field('updatedAt', {
        label: 'Updated',
        render: datetime
    }),
    field('completedAt', {
        label: 'Completed',
        render: datetime
    }),
]


export const DepositInfo = ({deposit}) => {

    const items = useMemo(() => {
        return Schema.filter(field => {
            const value = deposit[field.name]
            return value != null && value !== 0
        })
            .map(field => {
                const value = deposit[field.name]
                const render = field.options.render ? field.options.render({value, ...field.options.payload || {}}) : value
                return <Item key={field.name} label={field.options.label} value={render} />
            })
    }, [deposit])



    return (
        <Info>
            {items}
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
