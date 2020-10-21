import { createAction } from 'redux-actions'
import { Initiator } from 'entities/Initiator/types'

export const fetchInitiator = createAction<string>('initiator/fetch')
export const fetchInitiatorSuccess = createAction<Initiator>('initiator/fetch/success')
export const fetchInitiatorFailure = createAction<string>('initiator/fetch/failure')
