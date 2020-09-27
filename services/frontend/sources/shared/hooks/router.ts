import { useHistory } from 'react-router-dom'
import { useCallback } from 'react'

export const useLink = (location: string) => {
    const history = useHistory()

    return useCallback(() => {
        history.push(location)
    }, [location])
}
