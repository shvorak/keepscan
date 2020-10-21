import { createReducer, withProducer } from 'shared/reducers'
import { PagedState } from 'shared/types'

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

