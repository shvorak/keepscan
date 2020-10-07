import { useCallback, useEffect, useRef, useState } from 'react'

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

export const useRefFocus = (ref, delay = 0, deps = []) => {
    const [focused, setFocused] = useState(false)

    useRefEvent(ref, 'mouseenter', event => {
        setFocused(true)
    })
    useRefEvent(ref, 'mouseleave', event => {
        setFocused(false)
    })

    return focused
}
