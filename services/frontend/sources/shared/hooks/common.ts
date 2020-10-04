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

export const useRefEffect = (ref, effect, deps = []) => {
    useEffect(() => {
        if (ref && ref.current) effect(ref)
    }, deps)
}

export const useRefEvent = (ref, event, handler, deps = []) => {
    useRefEffect(ref, ref => {
        ref.current.addEventListener(event, handler)

        return () => ref.current.removeEventListener(event, handler)
    }, deps)
}
