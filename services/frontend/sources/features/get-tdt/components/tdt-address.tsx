import React, { ComponentProps, FC, useCallback } from 'react'
import styles from './tdt-address.less'
import { useClipboard } from 'use-clipboard-copy'
import { useClasses } from 'shared/hooks/styles'
import { CopySymbol, DAppSymbol } from 'uikit/symbol'
import { DisplayLink } from 'uikit/typography/display'
import { Tooltip } from 'uikit/overlay/tooltip'
import { DAPP } from '~/application/env'
import { useMedia } from 'shared/hooks/adaptive'
import { useAddress } from 'uikit/crypto/address'

type TdtAddressProps = ComponentProps<'div'> & {
    address: string
}

export const TdtAddress: FC<TdtAddressProps> = ({ address, ...props }) => {
    const isMobile = useMedia('tablet')

    const content = useAddress(address, isMobile)
    const className = useClasses(styles, 'area', props)
    const clipboard = useClipboard()

    const redeemUrl = `${DAPP}/deposit/${address}/redeem`

    const onCopy = useCallback(() => {
        clipboard.copy(address)
    }, [address])

    return (
        <div className={className} {...props}>
            <div className={styles.body}>{content}</div>
            <div className={styles.copy} onClick={onCopy}>
                <Tooltip content="Copy">
                    <CopySymbol />
                </Tooltip>
            </div>
            <div className={styles.dapp}>
                <DisplayLink to={redeemUrl}>
                    <Tooltip content="Open in tBTC DApp">
                        <DAppSymbol />
                    </Tooltip>
                </DisplayLink>
            </div>
        </div>
    )
}
