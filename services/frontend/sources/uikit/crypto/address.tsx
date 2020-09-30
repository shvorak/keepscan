import React, { FC, useMemo } from 'react'
import styles from './address.css'
import { useClasses } from 'shared/hooks/styles'
import { ellipsis } from 'shared/string'

type AddressProps = {
    full?: boolean
    value: string
    color?: 'green' | 'brass' | 'violet'
}

export const Address: FC<AddressProps> = ({ value, full, ...props }) => {
    const short = useMemo(() => {
        return value && (full ? value : ellipsis(6, 4, value))
    }, [value])

    const className = useClasses(styles, 'address', props)

    return (
        short && (
            <a href="#" className={className}>
                {short}
            </a>
        )
    )
}

Address.defaultProps = {
    full: false,
    color: 'violet',
}
