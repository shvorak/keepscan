import React, { FC, useCallback, useMemo } from 'react'
import styles from './list.less'
import { Card, CardFilter, CardHead, CardHeadSuffix, CardList } from 'uikit/layout/card'
import { InitiatorFilter } from 'features/initiators/components/filter'
import { useSelector } from 'react-redux'
import { getInitiatorsList, getInitiatorsPager, getInitiatorsQuery } from 'features/initiators/queries'
import { InitiatorListItem } from 'features/initiators/components/list-item'
import { useAction } from 'shared/hooks/redux'
import { initiatorNextPage, initiatorQueryChanged } from 'features/initiators/actions'
import { isEmpty } from 'ramda'
import { Empty } from 'uikit/display/empty'
import { Scroller } from 'components/scroller'
import { Loading } from 'uikit/display/loading'
import { Pagination } from 'components/pagination'

type InitiatorListProps = {}

export const InitiatorList: FC<InitiatorListProps> = ({ children, ...props }) => {
    const nextPage = useAction(initiatorNextPage)
    const changeFilter = useAction(initiatorQueryChanged)

    const items = useSelector(getInitiatorsList)
    const pager = useSelector(getInitiatorsPager)
    const query = useSelector(getInitiatorsQuery)

    const onNextPage = useCallback(() => {
        nextPage()
    }, [])

    const onQueryChange = useCallback((query) => {
        changeFilter(query)
    }, [])

    const list = useMemo(() => {
        return items.map((data) => <InitiatorListItem key={data.id} data={data} />)
    }, [items])

    const filtered = false === isEmpty(query)

    const content = !pager.loading && filtered && pager.total === 0 ? (
        <Empty />
    ) : (
        <Pagination pager={pager} loading={onNextPage}>
            {list}
        </Pagination>
    )

    return (
        <Card>
            <CardHead size={2}>
                Initiators
                <CardHeadSuffix>{pager.total}</CardHeadSuffix>
            </CardHead>
            <CardFilter>
                <InitiatorFilter query={query} onChange={onQueryChange} />
            </CardFilter>
            <CardList className={styles.body}>{content}</CardList>
        </Card>
    )
}
