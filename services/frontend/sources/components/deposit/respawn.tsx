import React, { useCallback } from 'react'
import styles from './respawn.css'
import { DAPP_CONFIG } from '~/application/env'
import { DepositStatus } from 'entities/Deposit/constants'

const RedeemActionConfig = {
    [DepositStatus.InitiatingDeposit]: '/deposit/{0}/get-address',
    [DepositStatus.WaitingForBtc]: '/deposit/{0}/pay',
    [DepositStatus.BtcReceived]: '/deposit/{0}/pay/confirming',
    [DepositStatus.SubmittingProof]: '/deposit/{0}/prove',
    [DepositStatus.ApprovingTdtSpendLimit]: '/deposit/{0}/prove',
    [DepositStatus.Minted]: '/deposit/{0}/congratulations',
}


export const Respawn = ({ deposit }) => {
    const config = DAPP_CONFIG[location.hostname] || DAPP_CONFIG['testnet.keepscan.com']
    const action = RedeemActionConfig[deposit.status]

    const open = useCallback(() => {
        window.open(`${config.host}${action.replace('{0}', deposit.id)}`)
    }, [action])

    if (null == action) {
        return null
    }

    return <div onClick={open} className={styles.link} />
}
