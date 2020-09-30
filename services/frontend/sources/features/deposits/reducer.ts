import { createReducer, withProducer } from 'shared/reducers'
import { depositPageLoaded } from 'features/deposits/actions'
import { uniqBy } from 'ramda'

const initialState = {
    items: [],
    pager: {
        take: 10,
        total: 0,
        pages: 0,
        current: 1,
    }
}

const getId = record => record.id

export default createReducer(initialState, withProducer)
    .on(depositPageLoaded, (state, { payload }) => {
        state.pager = payload.pager
        state.items = uniqBy(getId, state.items.concat(payload.items))
    })
