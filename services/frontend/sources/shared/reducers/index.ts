import produce from 'immer'
import { ActionFunction1, Action } from 'redux-actions'

const decorate = (handler, middlewares) => {
    return middlewares.reduce((next, middleware) => {
        return (state, action) => middleware(state, action, next)
    }, handler)
}

export const createReducer = <S>(initialState: S, ...middlewares) => {
    const reducers = {}

    const reducer = (state = initialState, action) => {
        if (action && reducers[action.type]) {
            return reducers[action.type](state, action)
        }
        return state
    }

    reducer.on = <A>(type: ActionFunction1<A, Action<A>>, func: (state: S, action: Action<A>) => void) => {
        // @ts-ignore
        reducers[type] = decorate(func, middlewares)
        return reducer
    }

    return reducer
}

export const withProducer = (state, action, next) => {
    return produce(state, (draft) => void next(draft, action))
}
