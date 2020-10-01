import { Paged } from 'shared/types'
import { Deposit } from 'entities/Deposit/types'
import { createAction } from 'redux-actions'

export const depositNextPage = createAction('deposit-page/next')
export const depositPageLoad = createAction<{page: number, take: number}>('deposit-page/load')
export const depositPageLoaded = createAction<Paged<Deposit>>('deposit-page/loaded')
export const depositPageFailed = createAction('deposit-page/failed')



