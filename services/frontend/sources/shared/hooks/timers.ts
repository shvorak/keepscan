import { useReference } from 'shared/hooks/common'
import { useEffect } from 'react'


export const useTimeout = (ms: number, callback: () => any) => {
    const onTimeout = useReference(callback)

    useEffect(() => {
        const timer = setTimeout(onTimeout, ms)
        return () => {
            clearTimeout(timer)
        }
    }, [])
}
