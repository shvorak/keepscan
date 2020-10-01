import { createAction } from 'redux-actions'
import { Redeem } from 'entities/Redeem/types'

export const fetchRedeem = createAction<string>('redeem/fetch')
export const fetchRedeemSuccess = createAction<Redeem>('redeem/fetch/success')
export const fetchRedeemFailure = createAction<string>('redeem/fetch/failure')
