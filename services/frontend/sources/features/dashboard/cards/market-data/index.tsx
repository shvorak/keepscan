import React from 'react'
import styles from './index.css'
import { Heading } from 'uikit/typography'
import { Card, CardBody, CardHead } from 'uikit/layout/card'

export const MarketData = ({ title }) => {
    return (
        <Card className={styles.card}>
            <CardHead stroked={false}>{title}</CardHead>
            <CardBody className={styles.body}>
                <Heading>1 tBTC = 1 BTC</Heading>
            </CardBody>
        </Card>
    )
}
