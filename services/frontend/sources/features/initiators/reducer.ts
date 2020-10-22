import { createReducer, withProducer } from 'shared/reducers'
import { PagedState } from 'shared/types'
import { Initiator } from 'entities/Initiator/types'
import { combineReducers } from 'redux'
import { initiatorNextPage, initiatorPageLoaded, initiatorQueryChanged } from 'features/initiators/actions'
import { clamp, isNil, max, prop, reject, uniqBy } from 'ramda'


const listMock: Initiator[] = [
    {
        id: '0xf5aeb452c01c9d941eebfc4a8335a7613bb09d0d',
        depositCount: 4,
        depositAmount: 14,
        redeemCount: 2,
        redeemAmount: 5,
        lastSeenAt: '2020-10-21T18:15:21Z'
    },
    {
        id: '0x3eba91fbff9793d4d1da9f71272020773d0e537c',
        depositCount: 130,
        depositAmount: 240,
        redeemCount: 0,
        redeemAmount: 0,
        lastSeenAt: '2020-10-20T10:15:21Z'
    },
    {
        id: '0xe02bbf8e1507427e07d9f8063a8ffc7d37309c89',
        depositCount: 23,
        depositAmount: 60,
        redeemCount: 14,
        redeemAmount: 30,
        lastSeenAt: '2020-10-18T10:15:21Z'
    },
]

const listInitialState: PagedState = {
    items: listMock,
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
        state.query = reject(isNil, payload)
        state.pager.current = 0
        state.items = []
    })

export default combineReducers({
    list,
})

