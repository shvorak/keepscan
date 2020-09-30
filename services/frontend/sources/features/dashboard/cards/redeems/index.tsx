import React, { useMemo } from 'react'
import styles from './index.css'
import { Placeholder } from 'uikit/display/placeholder'
import { Card, CardHead, CardList, CardMore } from 'uikit/layout/card'
import { useSelector } from 'react-redux'
import { getLatestRedeems } from 'features/dashboard/queries'
import { useLink } from 'shared/hooks/router'
import { RedeemRow } from 'features/dashboard/cards/redeems/redeem'

export const RedeemsCard = () => {
    const redeems = useSelector(getLatestRedeems)

    const toRedeems = useLink('/redeems')

    const redeemsList = useMemo(() => {
        return redeems.map((redeem) => <RedeemRow key={redeem.id} redeem={redeem} />)
    }, [redeems])

    return (
        <Card>
            <CardHead>Last Redeems</CardHead>
            <CardList className={styles.list}>
                <Placeholder wide visible={redeems.length === 0}>
                    loading
                </Placeholder>
                {redeemsList}
            </CardList>
            <CardMore onClick={toRedeems}>
                View all
            </CardMore>
        </Card>
    )
}
