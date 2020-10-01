import React from 'react'
import styles from './index.css'
import { Card, CardBody, CardHead } from 'uikit/layout/card'

export const OperationCards = ({children}) => (
    <div className={styles.card_block}>
        {children}
    </div>
)


export const OperationCard = ({title, children, ...props}) => (
    <Card {...props}>
        <CardHead stroked={false}>{title}</CardHead>
        <CardBody className={styles.card_body}>
            {children}
        </CardBody>
    </Card>
)
