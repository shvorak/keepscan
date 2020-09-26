import React, { ComponentProps, FC } from 'react'
import { Display } from 'uikit/typography/display'

type AmountProps = ComponentProps<typeof Display> & {
    value: string | number
    currency?: 'btc' | 'eth'
    children?: any
}

export const Amount: FC<AmountProps> = ({value, currency, ...props}) => {
    return (
        <Display {...props}>{value} {currency}</Display>
    )
}

Amount.defaultProps = {
    currency: 'btc'
}
