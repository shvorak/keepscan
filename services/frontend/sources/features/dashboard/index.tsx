import React from 'react'
import styles from './index.css'
import { DepositsCard } from 'features/dashboard/cards/deposits'
import { RedeemsCard } from 'features/dashboard/cards/redeems'
import { GraphCard } from 'features/dashboard/cards/graph-card'
import { StatCard } from 'features/dashboard/cards/stat-card'
import { useSelector } from 'react-redux'
import { getStatistic } from 'entities/Statistic/queries'

export const Dashboard = () => {
    const stats = useSelector(getStatistic)

    return (
        <>
            <div className={styles.graphs_grid}>
                <GraphCard title="tBTC Deposits" />
                <GraphCard title="tBTC Redeems" />
                <GraphCard title="Exchange rates">1 tBTC = 1 BTC</GraphCard>
            </div>

            <div className={styles.stats__grid}>
                <StatCard name="Total Supply" value={stats.totalSupply} />
                <StatCard name="Total Minted" value={stats.totalMinted} />
                <StatCard name="Supply Cap" value={stats.supplyCap} />
            </div>

            <div className={styles.lists_grid}>
                <DepositsCard />
                <RedeemsCard />
            </div>
        </>
    )
}
