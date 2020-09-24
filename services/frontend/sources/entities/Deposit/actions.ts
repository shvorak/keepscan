import { createAction } from 'redux-actions'
import { Deposit } from 'entities/Deposit/types'

export const depositCreated = createAction<Deposit>('deposit/created')