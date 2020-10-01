import { createReducer, withProducer } from 'shared/reducers'
import { Redeem } from 'entities/Redeem/types'
import { fetchRedeemSuccess } from 'entities/Redeem/actions'

type State = typeof initialState

const initialState: Record<string, Redeem> = {}

export default createReducer<State>(initialState, withProducer)
    .on(fetchRedeemSuccess, (state, {payload}) => {
        state[payload.id] = payload
    })
