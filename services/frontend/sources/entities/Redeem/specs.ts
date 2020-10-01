import { RedeemFailureStatuses } from 'entities/Redeem/constants'


export const isErrorStatus = (status: number) => RedeemFailureStatuses.includes(status)
