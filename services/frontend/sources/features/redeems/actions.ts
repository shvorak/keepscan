import { createAction } from 'redux-actions'
import { Paged } from 'shared/types'
import { Redeem } from 'entities/Redeem/types'

export const redeemNextPage = createAction('redeem-page/next')
export const redeemPageLoad = createAction<{page: number, take: number}>('redeem-page/load')
export const redeemPageLoaded = createAction<Paged<Redeem>>('redeem-page/loaded')
export const redeemPageFailed = createAction('redeem-page/failed')
