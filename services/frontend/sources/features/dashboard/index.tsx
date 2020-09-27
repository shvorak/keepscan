import React from 'react'
import styles from './index.css'
import { DepositsCard } from 'features/dashboard/cards/deposits'
import { RedeemsCard } from 'features/dashboard/cards/redeems'
import { GraphCard } from 'features/dashboard/cards/graph-card'
import { StatCard } from 'features/dashboard/cards/stat-card'

export const Dashboard = () => {
    return (
        <>
            <div className={styles.graphs_grid}>
                <GraphCard title="tBTC Deposits" />
                <GraphCard title="tBTC Redeems" />
                <GraphCard title="Exchange rates">
                    1 tBTC = 1 BTC
                </GraphCard>
            </div>

            <div className={styles.stats__grid}>
                <StatCard />
                <StatCard />
                <StatCard />
            </div>

            <div className={styles.lists_grid}>
                <DepositsCard />
                <RedeemsCard />
            </div>
        </>
    )
}
