import React, { ComponentProps, FC, useMemo } from 'react'
import styles from './amount.css'
import { Display } from 'uikit/typography/display'
import { Number } from 'uikit/display/number'
import { useClasses } from 'shared/hooks/styles'

type AmountProps = ComponentProps<typeof Display> & {
    value: string | number
    currency?: 'btc' | 'eth'
    children?: any
    precision?: number
}

export const Amount: FC<AmountProps> = ({value, currency, precision, ...props}) => {
    const className = useClasses(styles, 'amount', props)
    return <Number value={value} precision={precision} suffix=" ฿" className={className} />
}

Amount.defaultProps = {
    currency: 'btc',
    precision: 10
}
