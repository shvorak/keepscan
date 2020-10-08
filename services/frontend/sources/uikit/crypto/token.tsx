import React, { FC, useMemo } from 'react'
import styles from './address.css'
import { DisplayLink } from 'uikit/typography/display'
import { getNetworkLink } from 'uikit/crypto/utils'
import { ellipsis } from 'shared/string'
import { useClasses } from 'shared/hooks/styles'

type TokenProps = {
    tokenId: string
    contractId: string
}

export const Token: FC<TokenProps> = ({ tokenId, contractId, ...props }) => {
    const address = useMemo(() => {
        return tokenId && ellipsis(6, 4, tokenId)
    }, [tokenId])

    if (null == address) {
        return null
    }

    const className = useClasses(styles, 'address', {color: 'violet'})
    const indexerLink = getNetworkLink(contractId, 'token', { a: tokenId })

    return <DisplayLink to={indexerLink} className={className}>{address}</DisplayLink>
}
