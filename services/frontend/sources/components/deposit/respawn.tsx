import React, { useCallback } from 'react'
import styles from './respawn.css'
import { DAPP } from '~/application/env'
import { DepositStatus } from 'entities/Deposit/constants'

const RedeemActionConfig = {
    [DepositStatus.InitiatingDeposit]: '/deposit/{0}/get-address',
    [DepositStatus.WaitingForBtc]: '/deposit/{0}/pay',
    [DepositStatus.BtcReceived]: '/deposit/{0}/pay/confirming',
    [DepositStatus.SubmittingProof]: '/deposit/{0}/prove',
    [DepositStatus.ApprovingTdtSpendLimit]: '/deposit/{0}/prove',
}


export const Respawn = ({ deposit }) => {
    const action = RedeemActionConfig[deposit.status]

    const open = useCallback(() => {
        window.open(`${DAPP}${action.replace('{0}', deposit.id)}`)
    }, [action])

    if (null == action) {
        return null
    }

    return <div onClick={open} title="Open in tBTC DApp" className={styles.link} />
}
