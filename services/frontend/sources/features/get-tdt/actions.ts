import { createAction } from 'redux-actions'

export const fetchTdt = createAction('tdt/fetch')
export const fetchTdtSuccess = createAction('tdt/fetch/success')
export const fetchTdtFailure = createAction('tdt/fetch/failure')
