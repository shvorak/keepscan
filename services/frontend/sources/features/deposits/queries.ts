import { pathOr } from 'ramda'
import { Pager, Query } from 'shared/types'

export const getDepositsList = pathOr([], ['features', 'deposits', 'items'])
export const getDepositsPager = pathOr<Pager>(null, ['features', 'deposits', 'pager'])
export const getDepositsQuery = pathOr<Query>(null, ['features', 'deposits', 'query'])
