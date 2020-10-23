import { Query } from 'shared/types'
import rest from '~/shared/rest'

export const fetchInitiator = (id: string) => rest.get(`/initiator/${id}`)

export const fetchInitiatorPage = (page: number, take: number, query: Query) =>
    rest.get('/initiator', {
        params: { page, take, ...query },
    })

export const fetchOperationPage = (id: string, page: number, take: number, query: Query) =>
    rest.get(`/initiator/${id}/operation`, {
        params: { page, take, ...query },
    })
