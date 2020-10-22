import React, { useCallback } from 'react'
import styles from './index.css'
import { Card, CardFilter, CardHead, CardHeadSuffix, CardList } from 'uikit/layout/card'
import { Placeholder } from '~/uikit/display/placeholder'
import { useSelector } from 'react-redux'
import { useAction } from 'shared/hooks/redux'
import { depositNextPage, depositQueryChanged } from 'features/deposits/actions'
import { getDepositsList, getDepositsPager, getDepositsQuery } from 'features/deposits/queries'
import { DepositItem } from 'components/deposit/list-item'
import { Scroller } from 'components/scroller'
import { DepositFilter } from 'features/deposits/components/filter'
import { isEmpty } from 'ramda'
import { Empty } from 'uikit/display/empty'

export const DepositList = () => {
    const nextPage = useAction(depositNextPage)
    const changeFilter = useAction(depositQueryChanged)

    const items = useSelector(getDepositsList)
    const pager = useSelector(getDepositsPager)
    const query = useSelector(getDepositsQuery)

    const onNextPage = useCallback(() => {
        nextPage()
    }, [])

    const onQueryChange = useCallback((query) => {
        changeFilter(query)
    }, [])

    const list = items.map((deposit) => {
        return <DepositItem key={deposit.id} deposit={deposit} />
    })

    const filtered = false === isEmpty(query)

    const loading = (
        <Placeholder wide className={styles.loader}>
            loading
        </Placeholder>
    )

    const loadable = items.length > 0 && pager && pager.pages > pager.current

    const content = !pager.loading && filtered && pager.total === 0 ? (
        <Empty />
    ) : (
        <Scroller loading={loadable} loader={loading} onLoading={onNextPage}>
            {list}
        </Scroller>
    )

    return (
        <Card>
            <CardHead size={2}>
                Deposits
                <CardHeadSuffix>{pager.total}</CardHeadSuffix>
            </CardHead>
            <CardFilter>
                <DepositFilter query={query} onChange={onQueryChange} />
            </CardFilter>
            <CardList className={styles.body}>
                {content}
            </CardList>
        </Card>
    )
}
