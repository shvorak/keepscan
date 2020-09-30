import React, { useCallback } from 'react'
import styles from './index.css'
import { Card, CardHead, CardList } from 'uikit/layout/card'
import { Placeholder } from '~/uikit/display/placeholder'
import { useSelector } from 'react-redux'
import { useAction } from 'shared/hooks/redux'
import { useMount } from 'shared/hooks/lifecycle'
import { depositPageLoad } from 'features/deposits/actions'
import { getDepositsList } from 'features/deposits/queries'
import { DepositItem } from 'components/deposit/list-item'
import { Scroller } from 'components/scroller'

export const DepositList = () => {
    const fetchPage = useAction(depositPageLoad)

    const items = useSelector(getDepositsList)

    useMount(() => {
        fetchPage({ page: 1, take: 20 })
    })

    const nextPage = useCallback(() => {
        console.log('Next page')
    }, [])

    const list = items.map((deposit) => {
        return <DepositItem key={deposit.id} deposit={deposit} />
    })

    const loading = (
        <Placeholder wide className={styles.loader}>
            loading
        </Placeholder>
    )

    return (
        <Card>
            <CardHead size={3}>Deposits</CardHead>
            <CardList className={styles.body}>
                <Scroller visible loader={loading} onLoading={nextPage}>
                    {list}
                </Scroller>
            </CardList>
        </Card>
    )
}

