import { DepositFailureStatuses } from 'entities/Deposit/constants'

export const isErrorStatus = (status: number) => DepositFailureStatuses.includes(status)
