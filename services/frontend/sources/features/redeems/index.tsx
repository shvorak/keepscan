import React, { useCallback } from 'react'
import styles from 'features/deposits/index.css'
import { useSelector } from 'react-redux'
import { getDepositById } from 'entities/Deposit/queries'
import { Redirect } from 'react-router-dom'
import { Card, CardBody, CardHead, CardList } from 'uikit/layout/card'
import { Display } from 'uikit/typography/display'
import { Placeholder } from 'uikit/display/placeholder'
import { Redeem } from 'entities/Redeem/types'
import { useAction } from 'shared/hooks/redux'
import { redeemNextPage } from 'features/redeems/actions'
import { getRedeemsList, getRedeemsPager } from 'features/redeems/queries'
import { Scroller } from 'components/scroller'
import { RedeemItem } from 'components/redeem/list-item'

export const RedeemList = () => {
    const nextPage = useAction(redeemNextPage)

    const items = useSelector(getRedeemsList)
    const pager = useSelector(getRedeemsPager)

    const onNextPage = useCallback(() => {
        nextPage()
    }, [])

    const list = items.map((redeem) => {
        return <RedeemItem key={redeem.id} redeem={redeem} />
    })

    const loading = (
        <Placeholder wide className={styles.loader}>
            loading
        </Placeholder>
    )

    const loadable = items.length > 0 && pager && pager.pages > pager.current

    return (
        <Card>
            <CardHead size={3}>Redeems</CardHead>
            <CardList className={styles.body}>
                <Scroller visible={loadable} loader={loading} onLoading={onNextPage}>
                    {list}
                </Scroller>
            </CardList>
        </Card>
    )
}

export const RedeemDetail = ({ id }) => {
    const deposit: Redeem = useSelector(getDepositById(id))

    if (null == deposit) {
        return <Redirect to="/404" />
    }

    return (
        <Card>
            <CardHead size={3}>Deposit {deposit.id}</CardHead>
            <CardBody className={styles.body}>
                <Display>Whatever: {deposit.btcRedeemed}</Display>
            </CardBody>
        </Card>
    )
}
