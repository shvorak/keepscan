import { createAction } from 'redux-actions'

export const redeemsStatLoaded = createAction('dashboard/stats/redeems/loaded')
export const depositsStatLoaded = createAction('dashboard/stats/deposits/loaded')


export const latestRedeemsLoaded = createAction('dashboard/latest/redeems/loaded')
export const latestDepositsLoaded = createAction('dashboard/latest/deposits/loaded')
