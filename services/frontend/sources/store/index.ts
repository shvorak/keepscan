import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import startupSaga from '~/store/sagas'
import reducers from '~/store/reducers'


// @ts-ignore
const composeExtension: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeEnhancers = composeExtension || compose

const sagaMiddleware = createSagaMiddleware()

// TODO: Create redux store
export const store = createStore(reducers, composeEnhancers(
    applyMiddleware(sagaMiddleware)
))

sagaMiddleware.run(startupSaga)
