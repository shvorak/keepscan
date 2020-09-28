import { createAction } from 'redux-actions'
import { Deposit } from 'entities/Deposit/types'
import { Paged, PagedQuery } from 'shared/types'

export const depositCreated = createAction<Deposit>('deposit/created')
export const depositFetched = createAction<Deposit[]>('deposit/fetched')


export const depositPageFetch = createAction<PagedQuery<Deposit>>('deposit/page/fetch')
export const depositPageFetched = createAction<Paged<Deposit>>('deposit/page/fetched')
