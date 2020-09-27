import { queryById, queryList } from 'shared/queries'

export const getDeposits = queryList('entities.deposit')

export const getDepositById = (id: string) => queryById('entities.deposit', id)
