import { combineReducers } from 'redux'


export default combineReducers({
    deposit: require('features/deposits/reducers').default,
    entities: combineReducers({
        deposit: require('entities/Deposit/reducer').default,
        network: require('entities/Network/reducer').default,
    })
})
