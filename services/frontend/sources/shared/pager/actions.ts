import { createAction } from 'redux-actions'

export const pagerActions = {
    pager: {
        next: createAction('pager/next'),
    },
    query: {
        changed: createAction<Record<string, any>>('query/changed'),
    },
    order: {
        changed: createAction('order/changed'),
    },
}
