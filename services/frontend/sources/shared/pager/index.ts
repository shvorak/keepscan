import { useEffect, useMemo, useReducer, useRef } from 'react'
import { pagerReducer, PagerStateDefault } from 'shared/pager/reducer'

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
