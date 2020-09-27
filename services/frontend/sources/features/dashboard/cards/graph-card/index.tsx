import React from 'react'
import styles from './index.css'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Placeholder } from 'uikit/display/placeholder'

export const GraphCard = ({ title, children = null }) => {
    const content = children ? children : (
        <Placeholder wide>soon</Placeholder>
    )

    return (
        <Card className={styles.card}>
            <CardHead stroked={false}>{title}</CardHead>
            <CardBody className={styles.body}>
                {content}
            </CardBody>
        </Card>
    )
}
