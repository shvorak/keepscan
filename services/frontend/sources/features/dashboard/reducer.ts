import { createReducer, withProducer } from 'shared/reducers'
import {
    depositsStatLoaded,
    latestDepositsLoaded,
    latestRedeemsLoaded, operationsStatLoaded,
    redeemsStatLoaded, supplyStatLoaded
} from 'features/dashboard/actions'
import { format } from 'date-fns'

const initialState = {
    redeems: [],
    deposits: [],
    supply_stat: [],
    operations_stat: []
}

export default createReducer<typeof initialState>(initialState, withProducer)
    .on(latestRedeemsLoaded, (state, { payload }) => {
        state.redeems = payload
    })
    .on(latestDepositsLoaded, (state, { payload }) => {
        state.deposits = payload
    })
    .on(supplyStatLoaded, (state, { payload }) => {
        state.supply_stat = payload.map(stat => {
            return {
                ...stat,
                label: format(new Date(stat.date), 'dd MMM')
            }
        })
    })
    .on(operationsStatLoaded, (state, { payload }) => {
        state.operations_stat = payload.map(stat => {
            return {
                ...stat,
                label: format(new Date(stat.date), 'dd MMM')
            }
        })
    })
