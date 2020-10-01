import { combineReducers } from 'redux'


export default combineReducers({
    entities: combineReducers({
        redeem: require('entities/Redeem/reducer').default,
        deposit: require('entities/Deposit/reducer').default,
        network: require('entities/Network/reducer').default,
        statistic: require('entities/Statistic/reducer').default,
    }),
    features: combineReducers({
        get_tdt: require('features/get-tdt/reducer').default,
        redeems: require('features/redeems/reducer').default,
        deposits: require('features/deposits/reducer').default,
        dashboard: require('features/dashboard/reducer.ts').default
    })
})
