import { createAction } from 'redux-actions'
import { Paged, Query } from 'shared/types'
import { Initiator } from 'entities/Initiator/types'

export const initiatorNextPage = createAction('initiator-page/next')
export const initiatorPageLoad = createAction<{page: number, take: number}>('initiator-page/load')
export const initiatorPageLoaded = createAction<Paged<Initiator>>('initiator-page/loaded')
export const initiatorPageFailed = createAction('initiator-page/failed')
export const initiatorQueryChanged = createAction<Query>('initiator-page/query')
