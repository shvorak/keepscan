import React from 'react'
import styles from './index.css'
import { Placeholder } from 'uikit/display/placeholder'
import { Card, CardHead, CardList } from 'uikit/layout/card'

export const RedeemsCard = () => {
    return (
        <Card>
            <CardHead>Redeems</CardHead>
            <CardList className={styles.list}>
                <Placeholder wide>
                    soon
                </Placeholder>
            </CardList>
        </Card>
    )
}
