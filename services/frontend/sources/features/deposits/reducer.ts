import { createReducer, withProducer } from 'shared/reducers'
import { depositNextPage, depositPageLoad, depositPageLoaded } from 'features/deposits/actions'
import { clamp, uniqBy } from 'ramda'

const initialState = {
    items: [],
    pager: {
        take: 20,
        total: 0,
        pages: 1,
        current: 0,
    }
}

const getId = record => record.id

export default createReducer(initialState, withProducer)
    .on(depositNextPage, (state) => {
        state.pager.current = clamp(1, state.pager.pages, state.pager.current + 1)
    })
    .on(depositPageLoaded, (state, { payload }) => {
        state.pager = payload.pager
        state.items = uniqBy(getId, state.items.concat(payload.items))
    })
