import { pathOr } from 'ramda'
import { Pager } from 'shared/types'

export const getDepositsList = pathOr([], ['features', 'deposits', 'items'])
export const getDepositsPager = pathOr<Pager>(null, ['features', 'deposits', 'pager'])
