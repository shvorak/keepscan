import { pathOr } from 'ramda'


export const getDepositsStat = pathOr([], ['features', 'dashboard', 'deposits'])
