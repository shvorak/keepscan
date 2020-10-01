import { useCallback, useEffect, useRef } from 'react'

export const useReference = (fn) => {
    const ref = useRef(fn)

    useEffect(() => {
        ref.current = fn
    }, [fn])

    return useCallback((...args) => {
        return ref.current(...args)
    }, [])
}
