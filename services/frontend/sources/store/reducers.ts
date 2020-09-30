import { combineReducers } from 'redux'


export default combineReducers({
    entities: combineReducers({
        deposit: require('entities/Deposit/reducer').default,
        network: require('entities/Network/reducer').default,
        statistic: require('entities/Statistic/reducer').default,
    }),
    features: combineReducers({
        deposits: require('features/deposits/reducer').default,
        dashboard: require('features/dashboard/reducer.ts').default
    })
})
