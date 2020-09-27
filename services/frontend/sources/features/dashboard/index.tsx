import React from 'react'
import styles from './index.css'
import { DepositsCard } from 'features/dashboard/cards/deposits'
import { RedeemsCard } from 'features/dashboard/cards/redeems'
import { GraphCard } from 'features/dashboard/cards/graph-card'

export const Dashboard = () => {
    return (
        <>
            <div className={styles.graphs_grid}>
                <GraphCard title="tBTC Deposits" />
                <GraphCard title="tBTC Redeems" />
                <GraphCard title="KEEP Token" />
                <GraphCard title="Exchange rates" />
            </div>

            <div className={styles.lists_grid}>
                <DepositsCard />
                <RedeemsCard />
            </div>
        </>
    )
}
