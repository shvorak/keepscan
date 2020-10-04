import { clamp, max, uniqBy } from 'ramda'
import { createReducer, withProducer } from 'shared/reducers'
import { depositNextPage, depositPageLoaded, depositQueryChanged } from 'features/deposits/actions'

const initialState = {
    items: [],
    pager: {
        take: 20,
        total: 0,
        pages: 1,
        current: 0,
    },
    query: {},
}

const getId = record => record.id

export default createReducer(initialState, withProducer)
    .on(depositNextPage, (state) => {
        state.pager.current = clamp(1, max(1, state.pager.pages), state.pager.current + 1)
    })
    .on(depositPageLoaded, (state, { payload }) => {
        state.pager = payload.pager
        state.items = uniqBy(getId, state.items.concat(payload.items))
    })
    .on(depositQueryChanged, (state, {payload}) => {
        if (Object.keys(state.query).length === 0 && Object.keys(payload).length === 0) {
            return
        }
        state.query = payload
        state.pager.current = 0
        state.items = []
    })
