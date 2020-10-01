import React, { useCallback } from 'react'
import styles from './index.css'
import { Card, CardHead, CardList } from 'uikit/layout/card'
import { Placeholder } from '~/uikit/display/placeholder'
import { useSelector } from 'react-redux'
import { useAction } from 'shared/hooks/redux'
import { depositNextPage, depositPageLoad } from 'features/deposits/actions'
import { getDepositsList, getDepositsPager } from 'features/deposits/queries'
import { DepositItem } from 'components/deposit/list-item'
import { Scroller } from 'components/scroller'

export const DepositList = () => {
    const nextPage = useAction(depositNextPage)

    const items = useSelector(getDepositsList)
    const pager = useSelector(getDepositsPager)

    const onNextPage = useCallback(() => {
        nextPage()
    }, [])

    const list = items.map((deposit) => {
        return <DepositItem key={deposit.id} deposit={deposit} />
    })

    const loading = (
        <Placeholder wide className={styles.loader}>
            loading
        </Placeholder>
    )

    const loadable = items.length > 0 && pager && pager.pages > pager.current

    return (
        <Card>
            <CardHead size={3}>Deposits</CardHead>
            <CardList className={styles.body}>
                <Scroller visible={loadable} loader={loading} onLoading={onNextPage}>
                    {list}
                </Scroller>
            </CardList>
        </Card>
    )
}

