
import { createReducer, withProducer } from 'shared/reducers'
import { pagerActions } from 'shared/pager/actions'
import { clamp } from 'ramda'

type PagerState = {
    empty: boolean
    ready: boolean
    pager: {
        page: number
        take: number
        total: number
        pages: number
    }
    query: Record<string, any>
    order: Record<string, 'asc' | 'desc'>
}

export const PagerStateDefault: PagerState = {
    empty: false,
    ready: false,
    pager: {
        page: 1,
        take: 10,
        total: 0,
        pages: 0
    },
    query: {},
    order: {}
}

export const pagerReducer = createReducer<PagerState>(PagerStateDefault, withProducer)
    .on(pagerActions.pager.next, (state) => {
        state.pager.page = clamp(1, state.pager.pages, state.pager.page + 1)
    })
    .on(pagerActions.query.changed, (state, {payload}) => {
        state.pager.page = 1
        state.pager.total = 0
        state.pager.pages = 0
        state.query = payload
    })
