import React, { useCallback, useState } from 'react'
import styles from './details.css'
import { Deposit } from 'entities/Deposit/types'
import { useSelector } from 'react-redux'
import { getDepositById } from 'entities/Deposit/queries'
import { useTimeout } from 'shared/hooks/timers'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Placeholder } from 'uikit/display/placeholder'
import { Heading } from 'uikit/typography'
import { Display } from 'uikit/typography/display'
import { Amount } from 'uikit/crypto/amount'
import { useMount } from 'shared/hooks/lifecycle'
import { useAction } from 'shared/hooks/redux'
import { fetchDeposit } from 'entities/Deposit/actions'
import { formatStatus } from 'entities/Deposit/format'
import { DepositInfo } from 'components/deposit/info'
import { DAPP_CONFIG } from '~/application/env'
import { DepositStatus } from 'entities/Deposit/constants'
import { DateTimeDistance } from 'uikit/display/datetime'
import { DepositLog } from 'components/deposit/log'

export const DepositDetails = ({ id }) => {
    const [failed, setFailed] = useState(false)

    const deposit: Deposit = useSelector(getDepositById(id))
    const loading = deposit == null

    const fetch = useAction(fetchDeposit)

    useMount(() => {
        fetch(id)
    })

    // If deposit is null after 3 seconds we display error content
    useTimeout(3000, () => {
        setFailed(deposit == null)
    })

    const content = failed ? <Failed id={id} /> : loading ? <Loading /> : <Content deposit={deposit} />

    return (
        <>
            <div className={styles.title}>
                <Heading>Deposit</Heading>
                <Display className={styles.tdt} size={20}>
                    {id}
                </Display>
            </div>

            {content}
        </>
    )
}

const Failed = ({ id }) => (
    <Card>
        <Placeholder wide>
            <Heading>Oooops :(</Heading>
            <Display>Can't retrieve information about deposit with id {id}</Display>
        </Placeholder>
    </Card>
)

const Loading = () => (
    <Card>
        <Placeholder wide>loading</Placeholder>
    </Card>
)

const Content = ({ deposit }) => (
    <>
        <div className={styles.stat}>
            <Card className={styles.stat_card}>
                <CardHead stroked={false}>Lot size</CardHead>
                <CardBody className={styles.stat_body}>
                    <div className={styles.stat_volume}>
                        <Amount className={styles.stat_volume_head} value={deposit.lotSize} />
                    </div>
                </CardBody>
            </Card>

            <Card className={styles.stat_card}>
                <CardHead stroked={false}>Created</CardHead>
                <CardBody className={styles.stat_body}>
                    <DateTimeDistance className={styles.created_at} value={deposit.createdAt} />
                </CardBody>
            </Card>
            <Card className={styles.stat_card}>
                <CardHead stroked={false}>Status</CardHead>
                <CardBody className={styles.stat_body}>
                    <Display className={styles.status}>{formatStatus(deposit.status)}</Display>
                </CardBody>
            </Card>
        </div>

        <Card className={styles.details}>
            <CardBody className={styles.body}>
                <DepositInfo deposit={deposit} />
            </CardBody>
        </Card>

        <Card>
            <CardHead>Log</CardHead>
            <CardBody className={styles.body}>
                <DepositLog deposit={deposit} />
            </CardBody>
        </Card>
    </>
)

const RedeemActionConfig = {
    [DepositStatus.InitiatingDeposit]: '/deposit/{0}/get-address',
    [DepositStatus.WaitingForBtc]: '/deposit/{0}/pay',
    [DepositStatus.BtcReceived]: '/deposit/{0}/pay/confirming',
    [DepositStatus.SubmittingProof]: '/deposit/{0}/prove',
    [DepositStatus.ApprovingTdtSpendLimit]: '/deposit/{0}/prove',
    [DepositStatus.Minted]: '/deposit/{0}/congratulations',
}

const DepositDAppLink = ({ deposit }) => {
    const config = DAPP_CONFIG[location.hostname] || DAPP_CONFIG['testnet.keepscan.com']
    const action = RedeemActionConfig[deposit.status]

    const open = useCallback(() => {
        window.open(`${config.host}${action.replace('{0}', deposit.id)}`)
    }, [action])

    if (null == action) {
        return null
    }

    return <div onClick={open}>Open in DApp</div>
}
