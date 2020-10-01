import { pathOr } from 'ramda'
import { Pager } from 'shared/types'

export const getRedeemsList = pathOr([], ['features', 'redeems', 'items'])
export const getRedeemsPager = pathOr<Pager>(null, ['features', 'redeems', 'pager'])
