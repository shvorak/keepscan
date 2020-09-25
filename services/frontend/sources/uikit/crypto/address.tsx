import React, { FC, useMemo } from 'react'
import styles from './address.css'
import { useClasses } from 'shared/hooks/styles'

type AddressProps = {
    value: string
    color?: string
}


export const Address: FC<AddressProps> = ({value, ...props}) => {
    const short = useMemo(() => {
        return value && [
            value.toString().substr(0, 6),
            value.toString().substr(-4)
        ].join('....')
    }, [value])

    const className = useClasses(styles, 'address', props)

    return short && <a href="#" className={className}>{short}</a>
}
