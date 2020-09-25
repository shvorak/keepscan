import { useEffect } from 'react'

export const useMount = (effect) => useEffect(effect, [])
export const useUnmount = (effect) => useEffect(() => effect, [])
