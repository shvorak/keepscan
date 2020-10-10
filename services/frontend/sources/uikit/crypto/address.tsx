import React, { ComponentProps, FC, useCallback, useMemo } from 'react'
import styles from './address.css'
import { useClasses } from 'shared/hooks/styles'
import { ellipsis } from 'shared/string'
import { Display, DisplayLink } from 'uikit/typography/display'
import { useClipboard } from 'use-clipboard-copy'
import { getNetworkLink } from 'uikit/crypto/utils'
import { useMedia } from 'react-use'

type AddressProps = ComponentProps<'a'> & {
    full?: boolean
    kind?: 'address' | 'token' | 'tx'
    value: string
    color?: 'green' | 'brass' | 'violet'
    useCopy?: boolean
    useLink?: boolean
    params?: Record<string, any>
}

export const Address: FC<AddressProps> = ({ value, useCopy, useLink, kind, full, params, ...props }) => {
    const minimalWide = useMedia('(min-width: 1280px)')

    const address = useMemo(() => {
        return value && (full && minimalWide ? value : ellipsis(6, 4, value))
    }, [value, minimalWide])

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

    if (useLink) {
        const to = getNetworkLink(value, kind, params || {})
        return (
            <DisplayLink to={to} className={className}>
                {address}
                {useCopy && <div className={styles.clipboard} onClick={onCopy} />}
            </DisplayLink>
        )
    }

    return (
        <Display className={className}>
            {address}
            {useCopy && <div className={styles.clipboard} onClick={onCopy} />}
        </Display>
    )
}

Address.defaultProps = {
    full: false,
    useLink: true,
    useCopy: true,
    kind: 'address',
    color: 'violet',
}
