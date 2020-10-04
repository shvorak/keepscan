import React, { useCallback, useEffect } from 'react'
import styles from './index.css'
import { Card, CardFilter, CardHead, CardHeadSuffix, CardList } from 'uikit/layout/card'
import { Placeholder } from '~/uikit/display/placeholder'
import { useSelector } from 'react-redux'
import { useAction } from 'shared/hooks/redux'
import { depositNextPage, depositQueryChanged } from 'features/deposits/actions'
import { getDepositsList, getDepositsPager } from 'features/deposits/queries'
import { DepositItem } from 'components/deposit/list-item'
import { Scroller } from 'components/scroller'
import { Input, Select } from 'uikit/control'
import { useInput, useModel } from 'shared/hooks/controls'
import { DepositStatus, DepositStatusNames } from 'entities/Deposit/constants'
import { LOT_SIZES } from '~/application/env'
import { Amount } from 'uikit/crypto/amount'

const OPTIONS = Object.values(DepositStatus).map((status) => {
    return {
        value: status,
        label: DepositStatusNames[status],
    }
})

const LOT_SIZES_OPTIONS = LOT_SIZES.map(size => ({
    value: size,
    label: <Amount value={size} />
}))

export const DepositList = () => {
    const nextPage = useAction(depositNextPage)
    const changeFilter = useAction(depositQueryChanged)

    const items = useSelector(getDepositsList)
    const pager = useSelector(getDepositsPager)

    const [query, { onChange }] = useModel({})

    useEffect(() => {
        changeFilter(query)
    }, [query])

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
            <CardHead size={3}>
                Deposits
                <CardHeadSuffix>{pager.total}</CardHeadSuffix>
            </CardHead>
            <CardFilter>
                <Input label="Search" value={query.search} onChange={onChange('search')} />
                <Select label="Deposit status" value={query.status} onChange={onChange('status')} options={OPTIONS} />
                <Select label="Lot size" value={query.lotSize} onChange={onChange('lotSize')} options={LOT_SIZES_OPTIONS} />
            </CardFilter>
            <CardList className={styles.body}>
                <Scroller visible={loadable} loader={loading} onLoading={onNextPage}>
                    {list}
                </Scroller>
            </CardList>
        </Card>
    )
}
