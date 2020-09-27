import React from 'react'
import styles from './index.css'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Placeholder } from '~/uikit/display/placeholder'


export const Api = () => {

    return (
        <Card>
            <CardHead size={3}>API Documentation</CardHead>
            <CardBody className={styles.body}>
                <Placeholder wide>
                    very soon
                </Placeholder>
            </CardBody>
        </Card>
    )
}
