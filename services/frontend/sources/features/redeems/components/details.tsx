import React, { useState } from 'react'
import styles from './details.css'
import { useSelector } from 'react-redux'
import { useAction } from 'shared/hooks/redux'
import { useMount } from 'shared/hooks/lifecycle'
import { useTimeout } from 'shared/hooks/timers'
import { getRedeemById } from 'entities/Redeem/queries'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Placeholder } from 'uikit/display/placeholder'
import { Heading } from 'uikit/typography'
import { Display } from 'uikit/typography/display'
import { Redeem } from 'entities/Redeem/types'
import { fetchRedeem } from 'entities/Redeem/actions'
import { RedeemInfo } from 'components/redeem/info'
import { RedeemLog } from 'components/redeem/log'

export const RedeemDetails = ({ id }) => {
    const [failed, setFailed] = useState(false)

    const redeem: Redeem = useSelector(getRedeemById(id))
    const loading = redeem == null

    const fetch = useAction(fetchRedeem)

    useMount(() => {
        fetch(id)
    })

    // If redeem is null after 3 seconds we display error content
    useTimeout(3000, () => {
        setFailed(redeem == null)
    })

    const content = failed ? <Failed id={id} /> : loading ? <Loading /> : <Content redeem={redeem} />

    return (
        <>
            <div className={styles.title}>
                <Heading>Redeem</Heading>
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
            <Display>Can't retrieve information about redeem with id {id}</Display>
        </Placeholder>
    </Card>
)

const Loading = () => (
    <Card>
        <Placeholder wide>loading</Placeholder>
    </Card>
)

const Content = ({redeem}) => {

    return (
        <>
            <Card className={styles.panel}>
                <CardHead>Operation details</CardHead>
                <CardBody>
                    <RedeemInfo redeem={redeem}  />
                </CardBody>
            </Card>

            <Card className={styles.panel}>
                <CardHead>Operation Log</CardHead>
                <CardBody>
                    <RedeemLog redeem={redeem} />
                </CardBody>
            </Card>
        </>
    )
}
