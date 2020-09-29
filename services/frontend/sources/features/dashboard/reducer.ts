import { createReducer, withProducer } from 'shared/reducers'
import { depositsStatLoaded } from 'features/dashboard/actions'
import { format } from 'date-fns'

const initialState = {
    deposits: []
}

export default createReducer(initialState, withProducer)
    .on(depositsStatLoaded, (state, { payload }) => {
        state.deposits = payload.map(stat => {
            return {
                ...stat,
                label: format(new Date(stat.date), 'dd MMM')
            }
        })
    })
