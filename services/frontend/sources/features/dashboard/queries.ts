import { pathOr } from 'ramda'
import { ExchangeRate } from 'features/dashboard/types'

export const getLatestRedeems = pathOr([], ['features', 'dashboard', 'redeems'])
export const getLatestDeposits = pathOr([], ['features', 'dashboard', 'deposits'])

export const getSupplyStat = pathOr([], ['features', 'dashboard', 'supply_stat'])
export const getExchangeRates = pathOr<ExchangeRate>(null, ['features', 'dashboard', 'exchange_rate'])
export const getOperationsStat = pathOr([], ['features', 'dashboard', 'operations_stat'])
