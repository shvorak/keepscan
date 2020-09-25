import { createReducer, withProducer } from 'shared/reducers'
import { depositCreated, depositFetched } from 'entities/Deposit/actions'
import { Deposit } from 'entities/Deposit/types'


type State = typeof initialState

const initialState: Record<string, Deposit> = {}

export default createReducer<State>(initialState, withProducer)
    .on(depositCreated, (state, {payload}) => {
        state[payload.id] = payload
    })
    .on(depositFetched, (state, { payload }) => {
        payload.forEach(deposit => state[deposit.id] = deposit)
    })
