import React, { ComponentProps, FC } from 'react'
import styles from './amount.css'
import { Display } from 'uikit/typography/display'
import { Symbol } from 'uikit/crypto/symbol'

type AmountProps = ComponentProps<typeof Display> & {
    value: string | number
    currency?: 'btc' | 'eth'
    children?: any
}

export const Amount: FC<AmountProps> = ({value, currency, ...props}) => {
    const number = Number(value).toFixed(2)
    return (
        <Display className={styles.amount} {...props}>{number} <Symbol size={20} currency={currency} /></Display>
    )
}

Amount.defaultProps = {
    currency: 'btc'
}
