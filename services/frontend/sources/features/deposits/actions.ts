import { createAction } from 'redux-actions'

export const fetchTdt = createAction('deposit/tdt/fetch')
export const fetchTdtSuccess = createAction('deposit/tdt/fetch/success')
export const fetchTdtFailure = createAction('deposit/tdt/fetch/failure')
