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
import { ExchangeRateCard } from 'features/dashboard/cards/exchange-rate'

export const Dashboard = () => {
    const stats = useSelector(getStatistic)
    const isSmall = useMedia('mobile', 'tablet')

    return (
        <>
            <div className={styles.graphs_grid}>
                <OperationsGraph title="Deposits & Redeems" />
                <SupplyChangeCard title="Minted & Supply" />
                <ExchangeRateCard />
            </div>

            <div className={styles.stats__grid}>
                <StatCard name={isSmall ? 'Supply' : 'Current Supply'} value={stats.totalSupply} />
                <StatCard name={isSmall ? 'Minted' : 'Total Minted'} value={stats.totalMinted} />
                <StatCard name="Market data" value="1 TBTC = 1 BTC" suffix={null} />
            </div>

            <div className={styles.lists_grid}>
                <DepositsCard />
                <RedeemsCard />
            </div>
        </>
    )
}
