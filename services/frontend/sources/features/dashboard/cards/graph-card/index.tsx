import React from 'react'
import styles from './index.css'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Placeholder } from 'uikit/display/placeholder'

export const GraphCard = ({ title }) => {
    return (
        <Card className={styles.card}>
            <CardHead stroked={false}>{title}</CardHead>
            <CardBody className={styles.body}>
                <Placeholder wide>soon</Placeholder>
            </CardBody>
        </Card>
    )
}
