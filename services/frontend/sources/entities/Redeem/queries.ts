import { queryById } from 'shared/queries'

export const getRedeemById = (id: string) => queryById('entities.redeem', id)
