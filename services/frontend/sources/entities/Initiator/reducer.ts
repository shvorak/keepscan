import { createReducer, withProducer } from 'shared/reducers'
import { fetchDepositSuccess } from 'entities/Deposit/actions'

export default createReducer({}, withProducer)
    .on(fetchDepositSuccess, (state, { payload: deposit }) => {
        state[deposit.id] = deposit
    })
