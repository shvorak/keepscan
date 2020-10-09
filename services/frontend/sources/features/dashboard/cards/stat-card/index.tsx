import React, { FC } from 'react'
import styles from './index.css'
import { Card, CardBody } from 'uikit/layout/card'
import { Display } from 'uikit/typography/display'
import { Heading } from 'uikit/typography'

type StatCard = {
    name: string
    value: string | number
    suffix?: string
}

export const StatCard: FC<StatCard> = ({ name, value, suffix = 'TBTC' }) => {
    return (
        <Card className={styles.card}>
            <CardBody className={styles.body}>
                <Heading size={5} className={styles.name}>
                    {name}
                </Heading>
                <Display size={20}>
                    {value} {suffix}
                </Display>
            </CardBody>
        </Card>
    )
}
