import { pathOr } from 'ramda'


export const getTdtAddress = pathOr(null, ['features', 'deposits', 'tdt', 'address'])
export const getTdtLoading = pathOr(false, ['features', 'deposits', 'tdt_loading'])
export const getTdtFailure = pathOr(null, ['features', 'deposits', 'tdt_error'])
