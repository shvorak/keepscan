import React from 'react'
import styles from './tdt.css'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { GetTdt } from 'features/get-tdt'

export const TdtPage = () => {
    return (
        <Card>
            <CardHead size={3}>Get random TDT</CardHead>
            <CardBody className={styles.body}>
                <GetTdt />
            </CardBody>
        </Card>
    )
}

