import React from 'react'
import styles from './index.css'
import { DepositsCard } from 'features/dashboard/cards/deposits'
import { RedeemsCard } from 'features/dashboard/cards/redeems'
import { OperationsGraph, SupplyChangeCard } from 'features/dashboard/cards/graph-card'
import { StatCard } from 'features/dashboard/cards/stat-card'
import { useSelector } from 'react-redux'
import { getStatistic } from 'entities/Statistic/queries'
import { MarketData } from 'features/dashboard/cards/market-data'

export const Dashboard = () => {
    const stats = useSelector(getStatistic)

    return (
        <>
            <div className={styles.graphs_grid}>
                <OperationsGraph title="tBTC Deposits & Redeems" />
                <SupplyChangeCard title="Supply change" />
                <MarketData title="Market Data" />
            </div>

            <div className={styles.stats__grid}>
                <StatCard name="Current Supply" value={stats.totalSupply} />
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
