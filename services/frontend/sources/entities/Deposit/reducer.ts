import { createReducer, withProducer } from 'shared/reducers'
import { depositCreated } from 'entities/Deposit/actions'
import { Deposit } from 'entities/Deposit/types'


type State = typeof initialState

const initialState = new Map<string, Deposit>()

export default createReducer<State>(initialState, withProducer)
    .on(depositCreated, (state, {payload}) => {
        if (state.has(payload.id)) {
            state[payload.id] = payload
        }
    })
