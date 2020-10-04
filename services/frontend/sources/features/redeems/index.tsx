import React, { useCallback } from 'react'
import styles from 'features/deposits/index.css'
import { useSelector } from 'react-redux'
import { Card, CardFilter, CardHead, CardHeadSuffix, CardList } from 'uikit/layout/card'
import { Placeholder } from 'uikit/display/placeholder'
import { useAction } from 'shared/hooks/redux'
import { redeemNextPage, redeemQueryChanged } from 'features/redeems/actions'
import { getRedeemsList, getRedeemsPager, getRedeemsQuery } from 'features/redeems/queries'
import { Scroller } from 'components/scroller'
import { RedeemItem } from 'components/redeem/list-item'
import { RedeemFilter } from 'features/redeems/components/filter'

export { RedeemDetails } from './components/details'

export const RedeemList = () => {
    const nextPage = useAction(redeemNextPage)
    const queryChange = useAction(redeemQueryChanged)

    const items = useSelector(getRedeemsList)
    const pager = useSelector(getRedeemsPager)
    const query = useSelector(getRedeemsQuery)

    const onNextPage = useCallback(() => {
        nextPage()
    }, [])

    const onQueryChange = useCallback(query => {
        queryChange(query)
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
            <CardHead size={3}>
                Redeems
                <CardHeadSuffix>{pager.total}</CardHeadSuffix>
            </CardHead>
            <CardFilter>
                <RedeemFilter query={query} onChange={onQueryChange} />
            </CardFilter>
            <CardList className={styles.body}>
                <Scroller visible={loadable} loader={loading} onLoading={onNextPage}>
                    {list}
                </Scroller>
            </CardList>
        </Card>
    )
}
