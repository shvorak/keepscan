import React from 'react'
import styles from '../deposit/respawn.css'
import { RedeemStatus } from 'entities/Redeem/constants'
import { DisplayLink } from 'uikit/typography/display'
import { DAPP } from '~/application/env'

const RespawnActions = {
    [RedeemStatus.Requested]: 'deposit/{0}/redemption',
    [RedeemStatus.Signed]: 'deposit/{0}/redemption/signing',
    [RedeemStatus.Redeemed]: 'deposit/{0}/redemption/confirming',
}

export const RedeemRespawn = ({ status, redeem }) => {
    const action = RespawnActions[status]

    if (null == action || status !== redeem.status) {
        return null
    }

    const link = `${DAPP}/${action.replace('{0}', redeem.id)}`

    return <DisplayLink to={link} title="Open in tBTC DApp" className={styles.link} />
}
