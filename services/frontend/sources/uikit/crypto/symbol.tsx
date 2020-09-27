import React, { FC } from 'react'
import styles from './symbol.css'
import { useClasses, useStyles } from 'shared/hooks/styles'

import btc from 'static/coins/outlined/bitcoin.svg'

console.log(btc)

type SymbolProps = {
    size?: string | number
    currency: 'btc' | 'eth'
}

export const Symbol: FC<SymbolProps> = ({currency, ...props}) => {
    const className = useClasses(styles, 'symbol', props)
    const styleMap = useStyles(props, {size: 'fontSize'})
    return <i className={className} {...props} style={styleMap}><img src={btc} /></i>
}
