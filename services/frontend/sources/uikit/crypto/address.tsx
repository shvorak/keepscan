import React, { ComponentProps, FC, useMemo } from 'react'
import styles from './address.css'
import { useClasses } from 'shared/hooks/styles'
import { ellipsis } from 'shared/string'

type AddressProps = ComponentProps<'a'> & {
    full?: boolean
    value: string
    color?: 'green' | 'brass' | 'violet'
}

export const Address: FC<AddressProps> = ({ value, full, ...props }) => {
    const address = useMemo(() => {
        return value && (full ? value : ellipsis(6, 4, value))
    }, [value])

    const className = useClasses(styles, 'address', props)

    return (
        address && (
            <a href="#" className={className} {...props}>
                {address}
            </a>
        )
    )
}

Address.defaultProps = {
    full: false,
    color: 'violet',
}
