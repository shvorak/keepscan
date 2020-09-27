import React from 'react'
import styles from './index.css'
import { DepositsCard } from 'features/dashboard/cards/deposits'
import { RedeemsCard } from 'features/dashboard/cards/redeems'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Placeholder } from 'uikit/display/placeholder'

export const Dashboard = () => {
    return (
        <>
            <div className={styles.graphs_grid}>
                <Card>
                    <CardHead stroked={false}>tBTC Deposits</CardHead>
                    <CardBody>
                        <Placeholder wide>soon</Placeholder>
                    </CardBody>                </Card>
                <Card>
                    <CardHead stroked={false}>tBTC Redeems</CardHead>
                    <CardBody>
                        <Placeholder wide>soon</Placeholder>
                    </CardBody>
                </Card>
                <Card>
                    <CardHead stroked={false}>KEEP Token</CardHead>
                    <CardBody>
                        <Placeholder wide>soon</Placeholder>
                    </CardBody>
                </Card>
                <Card>
                    <CardHead stroked={false}>Exchange rates</CardHead>
                    <CardBody>
                        <Placeholder wide>soon</Placeholder>
                    </CardBody>
                </Card>
            </div>

            <div className={styles.lists_grid}>
                <DepositsCard />
                <RedeemsCard />
            </div>
        </>
    )
}
