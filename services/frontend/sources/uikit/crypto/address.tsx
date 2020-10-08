import React, { ComponentProps, FC, useCallback, useMemo } from 'react'
import styles from './address.css'
import { useClasses } from 'shared/hooks/styles'
import { ellipsis } from 'shared/string'
import { DisplayLink } from 'uikit/typography/display'
import { useClipboard } from 'use-clipboard-copy'
import { getNetworkLink } from 'uikit/crypto/utils'

type AddressProps = ComponentProps<'a'> & {
    full?: boolean
    copy?: boolean
    kind?: 'address' | 'token' | 'tx'
    link?: boolean
    value: string
    color?: 'green' | 'brass' | 'violet'
    params?: Record<string, any>
}

export const Address: FC<AddressProps> = ({ value, copy, link, kind, full, params, ...props }) => {
    const address = useMemo(() => {
        return value && (full ? value : ellipsis(6, 4, value))
    }, [value])

    const clipboard = useClipboard({
        copiedTimeout: 800
    })

    const onCopy = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        clipboard.copy(value)
    }, [value])

    const className = useClasses(styles, 'address', { ...props, copied: clipboard.copied })

    if (null == address) {
        return null
    }

    const indexerLink = link && getNetworkLink(value, kind, params || {})

    return (
        <DisplayLink to={indexerLink} className={className}>
            {address}

            {copy && <div className={styles.clipboard} onClick={onCopy} />}
        </DisplayLink>
    )
}

Address.defaultProps = {
    full: false,
    link: true,
    copy: true,
    kind: 'address',
    color: 'violet',
}
