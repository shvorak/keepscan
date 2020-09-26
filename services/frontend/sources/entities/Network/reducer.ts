import { createReducer, withProducer } from 'shared/reducers'
import { networksFetched } from 'entities/Network/actions'


export default createReducer({}, withProducer)
    .on(networksFetched, (state, {payload}) => {
        payload.forEach(network => {
            state[network.id] = network
        })
    })
