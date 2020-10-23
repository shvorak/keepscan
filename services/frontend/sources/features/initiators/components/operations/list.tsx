import React, { FC, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import styles from './list.less'
import { Card, CardBody, CardFilter, CardHead, CardHeadSuffix, CardList } from 'uikit/layout/card'
import { OperationFilter } from 'features/initiators/components/operations/filter'
import { Loading } from 'uikit/display/loading'
import { createAction, handleAction, handleActions } from 'redux-actions'
import { createReducer, withProducer } from 'shared/reducers'
import { PagedState, Query } from 'shared/types'
import { clamp, isNil, max, prop, reject, uniqBy } from 'ramda'
import { DefaultPager } from 'shared/pager'
import { fetchOperationPage } from 'features/initiators/requests'
import { OperationItem } from 'features/initiators/components/operations/list-item'
import { Pagination } from 'components/pagination'
import { Empty } from 'uikit/display/empty'

type OperationListProps = {
    initiatorId: string
}

export const OperationList: FC<OperationListProps> = ({ initiatorId, ...props }) => {
    const onFetch = useCallback(
        async (page: number, take: number, query: Query) => {
            try {
                const result = await fetchOperationPage(initiatorId, page, take, query)
                return result.data
            } catch (e) {}
        },
        [initiatorId]
    )

    const [{ pager, query, items }, onQueryChange, onNextPage] = useFilter(onFetch)

    const list = useMemo(() => items.map(data => <OperationItem key={data.tdt} data={data} />), [items])

    const empty = pager.loading === false && items.length === 0 && <Empty />

    return (
        <Card>
            <CardHead>
                Initiator Operations
                <CardHeadSuffix>{pager.total}</CardHeadSuffix>
            </CardHead>
            <CardFilter>
                <OperationFilter query={query} onChange={onQueryChange} />
            </CardFilter>
            <CardList className={styles.operations}>
                {empty}
                <Pagination loading={onNextPage} pager={pager}>
                    {list}
                </Pagination>
            </CardList>
        </Card>
    )
}

const next_page = createAction('next_page')
const load_success = createAction('load_success')
const query_changed = createAction<Query>('query_changed')

const reducer = createReducer<PagedState>(DefaultPager, withProducer)
    .on(next_page, (state) => {
        state.pager.current = clamp(1, max(1, state.pager.pages), state.pager.current + 1)
        state.pager.loading = true
    })
    .on(load_success, (state, { payload }) => {
        state.pager = payload.pager
        state.pager.loading = false
        state.items = uniqBy(prop('tdt'), state.items.concat(payload.items))
    })
    .on(query_changed, (state, { payload }) => {
        if (Object.keys(state.query).length === 0 && Object.keys(payload).length === 0) {
            return
        }
        state.query = reject(isNil, payload)
        state.pager.current = 1
        state.items = []
    })

const useFilter = (fetch: (page: number, take: number, query: Query) => Promise<any>) => {
    const [state, dispatch] = useReducer(reducer, DefaultPager)

    const onNextPage = useCallback(() => {
        dispatch(next_page())
    }, [])

    const onQueryChange = useCallback((query) => {
        dispatch(query_changed(query))
    }, [])

    useEffect(() => {
        fetch(state.pager.current, state.pager.take, state.query).then((data) => {
            dispatch(load_success(data))
        })
    }, [state.pager.current, state.query])

    return [state, onQueryChange, onNextPage]
}
