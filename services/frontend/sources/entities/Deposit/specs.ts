import { DepositStatusErrors } from 'entities/Deposit/constants'

export const isErrorStatus = (status: number) => DepositStatusErrors.includes(status)
