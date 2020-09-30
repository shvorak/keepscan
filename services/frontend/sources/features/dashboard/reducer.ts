import { createReducer, withProducer } from 'shared/reducers'
import {
    depositsStatLoaded,
    latestDepositsLoaded,
    latestRedeemsLoaded,
    redeemsStatLoaded
} from 'features/dashboard/actions'
import { format } from 'date-fns'

const initialState = {
    redeems: [],
    redeems_stat: [],
    deposits: [],
    deposits_stat: []
}

export default createReducer<typeof initialState>(initialState, withProducer)
    .on(latestRedeemsLoaded, (state, { payload }) => {
        state.redeems = payload
    })
    .on(latestDepositsLoaded, (state, { payload }) => {
        state.deposits = payload
    })
    .on(redeemsStatLoaded, (state, { payload }) => {
        state.redeems_stat = payload.map(stat => {
            return {
                ...stat,
                label: format(new Date(stat.date), 'dd MMM')
            }
        })
    })
    .on(depositsStatLoaded, (state, { payload }) => {
        state.deposits_stat = payload.map(stat => {
            return {
                ...stat,
                label: format(new Date(stat.date), 'dd MMM')
            }
        })
    })
