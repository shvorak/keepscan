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
import { Placeholder } from 'uikit/display/placeholder'
import { Empty } from 'uikit/display/empty'
import { Scroller } from 'components/scroller'

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

    const loading = (
        <Placeholder wide className={styles.loader}>
            loading
        </Placeholder>
    )

    const loadable = items.length > 0 && pager && pager.pages > pager.current

    const content = !pager.loading && filtered && pager.total === 0 ? (
        <Empty />
    ) : (
        <Scroller visible={loadable} loader={loading} onLoading={onNextPage}>
            {list}
        </Scroller>
    )

    return (
        <Card>
            <CardHead size={2}>
                Initiators
                <CardHeadSuffix>{234}</CardHeadSuffix>
            </CardHead>
            <CardFilter>
                <InitiatorFilter query={query} onChange={onQueryChange} />
            </CardFilter>
            <CardList className={styles.body}>{content}</CardList>
        </Card>
    )
}
