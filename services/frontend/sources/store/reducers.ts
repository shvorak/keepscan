import { combineReducers } from 'redux'


export default combineReducers({
    deposit: require('features/deposits/reducers').default
})
