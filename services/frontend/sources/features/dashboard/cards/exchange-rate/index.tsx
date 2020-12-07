import React from 'react'
import styles from './index.less'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Number } from 'uikit/display/number'
import { useSelector } from 'react-redux'
import { getExchangeRates } from 'features/dashboard/queries'

export const ExchangeRateCard = () => {
    const rage = useSelector(getExchangeRates)

    const info = rage && (
        <>
            <Number value={rage.priceInUsd} suffix=" USD" className={styles.usd} />
            <Number value={rage.priceInBtc} suffix=" BTC" className={styles.btc} precision={10} />
            <Number value={rage.priceInEth} suffix=" ETH" className={styles.eth} />
        </>
    )

    return (
        <Card className={styles.card}>
            <CardHead stroked={false}>KEEP exchange rate</CardHead>
            <CardBody className={styles.body}>
                {info}
            </CardBody>
        </Card>
    )
}
