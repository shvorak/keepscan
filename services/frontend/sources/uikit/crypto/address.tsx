import React, { ComponentProps, FC, useCallback, useMemo } from 'react'
import styles from './address.css'
import { useClasses } from 'shared/hooks/styles'
import { ellipsis } from 'shared/string'
import { DisplayLink } from 'uikit/typography/display'
import { INDEXERS } from '~/application/env'
import { useClipboard } from 'use-clipboard-copy'

type AddressProps = ComponentProps<'a'> & {
    full?: boolean
    kind?: 'address' | 'tx'
    value: string
    color?: 'green' | 'brass' | 'violet'
}

const getNetworkName = (address: string) => address && address.match(/^0x/) ? 'ethereum' : 'bitcoin'

const getNetworkLink = (address: string, kind: 'address' | 'tx' = 'address') => {
    const network = getNetworkName(address)
    const baseUrl = INDEXERS[network]

    return `${baseUrl}/${kind}/${address}`
}

export const Address: FC<AddressProps> = ({ value, kind, full, ...props }) => {
    const address = useMemo(() => {
        return value && (full ? value : ellipsis(6, 4, value))
    }, [value])

    const clipboard = useClipboard({
        copiedTimeout: 800
    })

    const onCopy = useCallback(event => {
        event.stopPropagation()
        clipboard.copy(value)
    }, [value])

    const className = useClasses(styles, 'address', { ...props, copied: clipboard.copied })

    if (null == address) {
        return null
    }

    const indexerLink = getNetworkLink(value, kind)

    return (
        <div className={className} onClick={onCopy}>
            {address}

            {indexerLink && <DisplayLink className={styles.opener} to={indexerLink} />}
        </div>
    )
}

Address.defaultProps = {
    full: false,
    kind: 'address',
    color: 'violet',
}
