import React from 'react'
import styles from './index.css'
import { DepositsCard } from 'features/dashboard/cards/deposits'
import { RedeemsCard } from 'features/dashboard/cards/redeems'
import { OperationsGraph, SupplyChangeCard } from 'features/dashboard/cards/graph-card'
import { StatCard } from 'features/dashboard/cards/stat-card'
import { useSelector } from 'react-redux'
import { getStatistic } from 'entities/Statistic/queries'
import { MarketData } from 'features/dashboard/cards/market-data'
import { useMedia } from 'shared/hooks/adaptive'

export const Dashboard = () => {
    const stats = useSelector(getStatistic)
    const isSmall = useMedia('mobile', 'tablet')

    return (
        <>
            <div className={styles.graphs_grid}>
                <OperationsGraph title="Deposits & Redeems" />
                <SupplyChangeCard title="Minted & Supply" />
                <MarketData title="Market Data" />
            </div>

            <div className={styles.stats__grid}>
                <StatCard name={isSmall ? 'Supply' : 'Current Supply'} value={stats.totalSupply} />
                <StatCard name={isSmall ? 'Minted' : 'Total Minted'} value={stats.totalMinted} />
                <StatCard name="Supply Cap" value="21kk" />
            </div>

            <div className={styles.lists_grid}>
                <DepositsCard />
                <RedeemsCard />
            </div>
        </>
    )
}
