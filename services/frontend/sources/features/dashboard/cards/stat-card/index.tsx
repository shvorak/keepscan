import React, { FC } from 'react'
import styles from './index.less'
import { Card, CardBody } from 'uikit/layout/card'
import { Display } from 'uikit/typography/display'
import { Heading } from 'uikit/typography'
import { useMedia } from 'shared/hooks/adaptive'

type StatCard = {
    name: string
    value: string | number
    suffix?: string
}

export const StatCard: FC<StatCard> = ({ name, value, suffix = 'TBTC' }) => {

    const isSmall = useMedia('mobile', 'tablet')

    return (
        <Card className={styles.card}>
            <CardBody className={styles.body}>
                <Heading size={5} className={styles.name}>
                    {name}
                </Heading>
                <Display>
                    {value} {!isSmall && suffix}
                </Display>
            </CardBody>
        </Card>
    )
}
