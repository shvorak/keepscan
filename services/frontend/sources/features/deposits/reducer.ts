import { clamp, isNil, max, reject, uniqBy } from 'ramda'
import { createReducer, withProducer } from 'shared/reducers'
import { depositNextPage, depositPageLoaded, depositQueryChanged } from 'features/deposits/actions'
import { PagedState } from 'shared/types'

const initialState: PagedState = {
    items: [],
    pager: {
        take: 20,
        total: 0,
        pages: 1,
        current: 0,
        loading: false,
    },
    query: {},
}

const getId = record => record.id

export default createReducer(initialState, withProducer)
    .on(depositNextPage, (state) => {
        state.pager.current = clamp(1, max(1, state.pager.pages), state.pager.current + 1)
        state.pager.loading = true
    })
    .on(depositPageLoaded, (state, { payload }) => {
        state.pager = payload.pager
        state.pager.loading = false
        state.items = uniqBy(getId, state.items.concat(payload.items))
    })
    .on(depositQueryChanged, (state, {payload}) => {
        if (Object.keys(state.query).length === 0 && Object.keys(payload).length === 0) {
            return
        }
        state.query = reject(isNil, payload)
        state.pager.current = 0
        state.items = []
    })
