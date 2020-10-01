import { pathOr } from 'ramda'

export const getDepositsList = pathOr([], ['features', 'deposits', 'items'])
