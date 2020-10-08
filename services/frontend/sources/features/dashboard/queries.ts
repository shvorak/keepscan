import { pathOr } from 'ramda'

export const getLatestRedeems = pathOr([], ['features', 'dashboard', 'redeems'])
export const getLatestDeposits = pathOr([], ['features', 'dashboard', 'deposits'])

export const getSupplyStat = pathOr([], ['features', 'dashboard', 'supply_stat'])
export const getOperationsStat = pathOr([], ['features', 'dashboard', 'operations_stat'])
