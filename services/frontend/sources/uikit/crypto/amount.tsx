import React, { ComponentProps, FC, useMemo } from 'react'
import styles from './amount.css'
import { Display } from 'uikit/typography/display'
import { Symbol } from 'uikit/crypto/symbol'

type AmountProps = ComponentProps<typeof Display> & {
    value: string | number
    currency?: 'btc' | 'eth'
    children?: any
    precision?: number
}

export const Amount: FC<AmountProps> = ({value, currency, precision, ...props}) => {

    const number = useMemo(() => {
        // TODO: Refactor this
        return Number(Number(value).toFixed(precision)).toString()
    }, [value, precision])
    return (
        <Display className={styles.amount} {...props}>{number} <Symbol size={20} currency={currency} /></Display>
    )
}

Amount.defaultProps = {
    currency: 'btc',
    precision: 2
}
