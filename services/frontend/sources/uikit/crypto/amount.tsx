import React, { ComponentProps, FC, useMemo } from 'react'
import styles from './amount.css'
import { Display } from 'uikit/typography/display'
import { Symbol } from 'uikit/crypto/symbol'
import { Number } from 'uikit/display/number'

type AmountProps = ComponentProps<typeof Display> & {
    value: string | number
    currency?: 'btc' | 'eth'
    children?: any
    precision?: number
}

export const Amount: FC<AmountProps> = ({value, currency, precision, ...props}) => {
    return <Number value={value} precision={precision} suffix=" ฿" className={styles.amount} />
}

Amount.defaultProps = {
    currency: 'btc',
    precision: 10
}
