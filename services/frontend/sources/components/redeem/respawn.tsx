import React from 'react'
import styles from '../deposit/respawn.css'
import { RedeemStatus } from 'entities/Redeem/constants'
import { DisplayLink } from 'uikit/typography/display'
import { DAPP } from '~/application/env'
import { Tooltip } from 'uikit/overlay/tooltip'
import { useMedia } from 'shared/hooks/adaptive'

const RespawnActions = {
    [RedeemStatus.Requested]: 'deposit/{0}/redemption',
    [RedeemStatus.Signed]: 'deposit/{0}/redemption/signing',
    [RedeemStatus.BtcTransferred]: 'deposit/{0}/redemption/confirming',
}

export const RedeemRespawn = ({ status, redeem }) => {
    const action = RespawnActions[status]
    const isMobile = useMedia('mobile', 'tablet')

    if (null == action || status !== redeem.status || isMobile) {
        return null
    }

    const link = `${DAPP}/${action.replace('{0}', redeem.id)}`

    return (
        <Tooltip content="Open in tBTC DApp">
            <DisplayLink to={link} title="Open in TBTC DApp" className={styles.link} />
        </Tooltip>
    )
}
