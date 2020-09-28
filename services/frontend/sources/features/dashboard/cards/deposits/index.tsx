import React, { useMemo } from 'react'
import styles from './index.css'
import { useSelector } from 'react-redux'
import { getDeposits } from 'entities/Deposit/queries'
import { DepositRow } from 'features/dashboard/cards/deposits/row'
import { Card, CardHead, CardList, CardMore } from 'uikit/layout/card'
import { Placeholder } from 'uikit/display/placeholder'
import { useLink } from 'shared/hooks/router'

export const DepositsCard = () => {
    const deposits = useSelector(getDeposits)

    const toDeposits = useLink('/deposits')

    const depositsList = useMemo(() => {
        return deposits.map((deposit) => <DepositRow key={deposit.id} deposit={deposit} />)
    }, [deposits])

    return (
        <Card>
            <CardHead>Last Deposits</CardHead>
            <CardList className={styles.list}>
                <Placeholder wide visible={deposits.length === 0}>
                    loading
                </Placeholder>
                {depositsList}
            </CardList>
            <CardMore onClick={toDeposits}>
                View all
            </CardMore>
        </Card>
    )
}
