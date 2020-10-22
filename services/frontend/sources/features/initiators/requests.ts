import { Query } from 'shared/types'
import rest from '~/shared/rest'

export const fetchInitiatorPage = (page: number, take: number, query: Query) =>
    rest.get('/initiator', {
        params: { page, take, ...query },
    })
