import { createReducer, withProducer } from 'shared/reducers'
import { clamp, max, uniqBy } from 'ramda'
import { redeemNextPage, redeemPageLoaded } from 'features/redeems/actions'

const initialState = {
    items: [],
    pager: {
        take: 20,
        total: 0,
        pages: 1,
        current: 0,
    },
}

const getId = record => record.id

export default createReducer(initialState, withProducer)
    .on(redeemNextPage, (state) => {
        state.pager.current = clamp(1, max(1, state.pager.pages), state.pager.current + 1)
    })
    .on(redeemPageLoaded, (state, { payload }) => {
        state.pager = payload.pager
        state.items = uniqBy(getId, state.items.concat(payload.items))
    })
