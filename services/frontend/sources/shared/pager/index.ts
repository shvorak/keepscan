import { useEffect, useMemo, useReducer, useRef } from 'react'
import { pagerReducer, PagerStateDefault } from 'shared/pager/reducer'
import { PagedState } from 'shared/types'

type PagerProps = {
    defaultTake?: number
    filters?: FilterItem[]
}

type FilterItem = {
    name: string
    type: 'search' | 'select'
}

export const usePager = () => {
    const moreRef = useRef()

    const [state, dispatch] = useReducer(pagerReducer, PagerStateDefault)

    useEffect(() => {
        console.log('Load records')
    }, [state.pager.page, state.query])


    return useMemo(() => {
        return {

        }
    }, [state])
}


export const DefaultPager: PagedState = {
    items: [],
    pager: {
        take: 20,
        total: 0,
        pages: 1,
        current: 1,
        loading: false,
    },
    query: {},
}
