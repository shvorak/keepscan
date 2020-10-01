import React, { useMemo } from 'react'
import styles from './index.css'
import { useSelector } from 'react-redux'
import { DepositItem } from 'components/deposit/list-item'
import { Card, CardHead, CardList, CardMore } from 'uikit/layout/card'
import { Placeholder } from 'uikit/display/placeholder'
import { useLink } from 'shared/hooks/router'
import { getLatestDeposits } from 'features/dashboard/queries'

export const DepositsCard = () => {
    const deposits = useSelector(getLatestDeposits)

    const toDeposits = useLink('/deposits')

    const depositsList = useMemo(() => {
        return deposits.map((deposit) => <DepositItem key={deposit.id} deposit={deposit} />)
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
            <CardMore onClick={toDeposits}>View all</CardMore>
        </Card>
    )
}
