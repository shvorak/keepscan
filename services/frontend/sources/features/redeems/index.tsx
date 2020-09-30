import React from 'react'
import styles from 'features/deposits/index.css'
import { useSelector } from 'react-redux'
import { getDepositById } from 'entities/Deposit/queries'
import { Redirect } from 'react-router-dom'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Display } from 'uikit/typography/display'
import { Placeholder } from 'uikit/display/placeholder'
import { Redeem } from 'entities/Redeem/types'

export const RedeemList = () => {
    return (
        <Card>
            <CardHead size={3}>Redeems</CardHead>
            <CardBody className={styles.body}>
                <Placeholder wide>very soon</Placeholder>
            </CardBody>
        </Card>
    )
}

export const RedeemDetail = ({ id }) => {
    const deposit: Redeem = useSelector(getDepositById(id))

    if (null == deposit) {
        return <Redirect to="/404" />
    }

    return (
        <Card>
            <CardHead size={3}>Deposit {deposit.id}</CardHead>
            <CardBody className={styles.body}>
                <Display>Whatever: {deposit.btcRedeemed}</Display>
            </CardBody>
        </Card>
    )
}
