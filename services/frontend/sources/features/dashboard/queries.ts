import { pathOr } from 'ramda'

export const getLatestRedeems = pathOr([], ['features', 'dashboard', 'redeems'])
export const getLatestDeposits = pathOr([], ['features', 'dashboard', 'deposits'])

export const getRedeemsStat = pathOr([], ['features', 'dashboard', 'redeems_stat'])
export const getDepositsStat = pathOr([], ['features', 'dashboard', 'deposits_stat'])
