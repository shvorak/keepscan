import { createAction } from 'redux-actions'
import { Paged, Query } from 'shared/types'
import { Initiator } from 'entities/Initiator/types'

export const initiatorLoad = createAction<string>('initiator/load')
export const initiatorLoaded = createAction<Initiator>('initiator/loaded')
export const initiatorFailed = createAction<string>('initiator/failed')

export const initiatorNextPage = createAction('initiator-page/next')
export const initiatorPageLoad = createAction<{page: number, take: number}>('initiator-page/load')
export const initiatorPageLoaded = createAction<Paged<Initiator>>('initiator-page/loaded')
export const initiatorPageFailed = createAction('initiator-page/failed')
export const initiatorQueryChanged = createAction<Query>('initiator-page/query')

export const initiatorOperationsLoaded = createAction('initiator/operations-page/loaded')
export const initiatorOperationsFailed = createAction('initiator/operations-page/loaded')
export const initiatorOperationsQueryChanged = createAction('initiator/operations-page/query')
