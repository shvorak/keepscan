import React, { FC } from 'react'
import styles from './index.css'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Display } from 'uikit/typography/display'
import { Heading } from 'uikit/typography'

type StatCard = {
    name: string
    value: string
}

export const StatCard: FC<StatCard> = ({ name, value }) => {
    return (
        <Card className={styles.card}>
            <CardBody className={styles.body}>
                <Heading size={5} className={styles.name}>{name}</Heading>
                <Display size={20}>{value}</Display>
            </CardBody>
        </Card>
    )
}
