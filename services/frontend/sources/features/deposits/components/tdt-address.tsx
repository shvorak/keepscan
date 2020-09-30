import React, { ComponentProps, FC, useCallback } from 'react'
import styles from './tdt-address.css'
import { useClipboard } from 'use-clipboard-copy'
import { useClasses } from 'shared/hooks/styles'
import { CopySymbol } from 'uikit/symbol'

type TdtAddressProps = ComponentProps<'div'> & {
    address: string
}

export const TdtAddress: FC<TdtAddressProps> = ({ address, ...props }) => {
    const className = useClasses(styles, 'area', props)
    const clipboard = useClipboard()

    const onCopy = useCallback(() => {
        clipboard.copy(address)
    }, [address])

    return (
        <div className={className} {...props}>
            <div className={styles.body}>{address}</div>
            <div className={styles.copy} onClick={onCopy}>
                <CopySymbol />
            </div>
        </div>
    )
}
