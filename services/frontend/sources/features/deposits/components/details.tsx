import React, { useCallback, useState } from 'react'
import styles from './details.css'
import { Deposit } from 'entities/Deposit/types'
import { useSelector } from 'react-redux'
import { getDepositById } from 'entities/Deposit/queries'
import { useTimeout } from 'shared/hooks/timers'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Placeholder } from 'uikit/display/placeholder'
import { Heading } from 'uikit/typography'
import { Display, DisplayLink } from 'uikit/typography/display'
import { Amount } from 'uikit/crypto/amount'
import { useMount } from 'shared/hooks/lifecycle'
import { useAction } from 'shared/hooks/redux'
import { fetchDeposit } from 'entities/Deposit/actions'
import { formatStatus } from 'entities/Deposit/format'
import { DepositInfo } from 'components/deposit/info'
import { DateTimeDistance } from 'uikit/display/datetime'
import { DepositLog } from 'components/deposit/log'
import { DepositStatus } from 'entities/Deposit/constants'
import { DAPP } from '~/application/env'
import { OperationCard, OperationCards } from 'components/details'

export const DepositDetails = ({ id }) => {
    const [failed, setFailed] = useState(false)

    const deposit: Deposit = useSelector(getDepositById(id))
    const loading = deposit == null

    const fetch = useAction(fetchDeposit)

    useMount(() => {
        fetch(id)
    })

    // If deposit is null after 3 seconds we display error content
    useTimeout(6000, () => {
        setFailed(deposit == null)
    })

    const content = failed ? <Failed id={id} /> : loading ? <Loading /> : <Content deposit={deposit} />

    const hasRedeem = deposit && deposit.status === DepositStatus.Redeemed

    return (
        <>
            <div className={styles.title}>
                <Heading className={styles.name}>Deposit</Heading>
                {hasRedeem && (
                    <DisplayLink to={`/redeems/${deposit.id}`} className={styles.switch}>
                        Redeem
                    </DisplayLink>
                )}

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
        <Placeholder wide className={styles.placeholder}>
            <Heading>Oooops :(</Heading>
            <Display>Can't retrieve information about deposit with id {id}</Display>
        </Placeholder>
    </Card>
)

const Loading = () => (
    <Card>
        <Placeholder wide className={styles.placeholder}>loading</Placeholder>
    </Card>
)

const Content = ({ deposit }) => (
    <>
        <OperationCards>
            <OperationCard title="Lot size">
                <Amount className={null} value={deposit.lotSize} />
            </OperationCard>

            <OperationCard title="Initiated">
                <DateTimeDistance value={deposit.createdAt} />
            </OperationCard>

            <OperationCard title="Status">
                <Display>{formatStatus(deposit.status)}</Display>
            </OperationCard>
        </OperationCards>

        <Card className={styles.panel}>
            <CardHead>Operation Info</CardHead>
            <CardBody className={styles.body}>
                <DepositInfo deposit={deposit} />
                <Redeem deposit={deposit} />
            </CardBody>
        </Card>

        <Card className={styles.panel}>
            <CardHead>Operation Log</CardHead>
            <CardBody className={styles.body}>
                <DepositLog deposit={deposit} />
            </CardBody>
        </Card>
    </>
)

const Redeem = ({ deposit }) => {
    const onRedeem = useCallback(() => {
        window.open(`${DAPP}/deposit/${deposit.id}/redeem`, 'blank')
    }, [deposit])

    if (deposit.status !== DepositStatus.Minted) {
        return null
    }
    return (
        <button onClick={onRedeem} className={styles.redeem}>
            Redeem
        </button>
    )
}
