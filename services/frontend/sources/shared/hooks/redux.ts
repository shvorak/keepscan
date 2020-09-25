import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const useAction = <T extends Function>(action: T): T => {
    const dispatch = useDispatch()
    // @ts-ignore
    return  useCallback((...args) => dispatch(action(...args)), [action])
}
