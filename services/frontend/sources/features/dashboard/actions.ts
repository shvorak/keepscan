import { createAction } from 'redux-actions'

export const supplyStatLoaded = createAction('dashboard/stats/supply/loaded')
export const redeemsStatLoaded = createAction('dashboard/stats/redeems/loaded')
export const exchangeRateLoaded = createAction('dashboard/stats/exchange-rate/loaded')
export const depositsStatLoaded = createAction('dashboard/stats/deposits/loaded')
export const operationsStatLoaded = createAction('dashboard/stats/operations/loaded')


export const latestRedeemsLoaded = createAction('dashboard/latest/redeems/loaded')
export const latestDepositsLoaded = createAction('dashboard/latest/deposits/loaded')
