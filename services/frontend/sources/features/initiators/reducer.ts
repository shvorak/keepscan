import { createReducer, withProducer } from 'shared/reducers'
import { PagedState } from 'shared/types'
import { Initiator } from 'entities/Initiator/types'
import { combineReducers } from 'redux'
import { initiatorNextPage, initiatorPageLoaded, initiatorQueryChanged } from 'features/initiators/actions'
import { clamp, isNil, max, prop, reject, uniqBy } from 'ramda'

const listInitialState: PagedState = {
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

const list = createReducer(listInitialState, withProducer)
    .on(initiatorNextPage, (state) => {
        state.pager.current = clamp(1, max(1, state.pager.pages), state.pager.current + 1)
        state.pager.loading = true
    })
    .on(initiatorPageLoaded, (state, { payload }) => {
        state.pager = payload.pager
        state.pager.loading = false
        state.items = uniqBy(prop('id'), state.items.concat(payload.items))
    })
    .on(initiatorQueryChanged, (state, { payload }) => {
        if (Object.keys(state.query).length === 0 && Object.keys(payload).length === 0) {
            return
        }
        console.log('Query changed')
        state.query = reject(isNil, payload)
        state.pager.current = 0
        state.items = []
    })

export default combineReducers({
    list,
})

