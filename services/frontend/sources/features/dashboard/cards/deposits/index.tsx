import React, { useMemo } from 'react'
import styles from './index.css'
import { useSelector } from 'react-redux'
import { getDeposits } from 'entities/Deposit/queries'
import { DepositRow } from 'features/dashboard/cards/deposits/row'
import { Card, CardHead, CardList } from 'uikit/layout/card'
import { Placeholder } from 'uikit/display/placeholder'

export const DepositsCard = () => {
    const deposits = useSelector(getDeposits)

    const depositsList = useMemo(() => {
        return deposits.map((deposit) => <DepositRow key={deposit.id} deposit={deposit} />)
    }, [deposits])


    return (
        <Card>
            <CardHead>Deposits</CardHead>
            <CardList className={styles.list}>
                <Placeholder wide visible={deposits.length === 0}>
                    loading
                </Placeholder>
                {depositsList}
            </CardList>
        </Card>
    )
}
