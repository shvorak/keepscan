import { pathOr } from 'ramda'
import { Pager } from 'shared/types'
import { Redeem } from 'entities/Redeem/types'

export const getRedeemsList = pathOr([], ['features', 'redeems', 'items'])
export const getRedeemsPager = pathOr<Pager>(null, ['features', 'redeems', 'pager'])
