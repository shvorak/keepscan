import { pathOr } from 'ramda'

export const getTdtAddress = pathOr(null, ['features', 'get_tdt', 'tdt', 'address'])
export const getTdtLoading = pathOr(false, ['features', 'get_tdt', 'tdt_loading'])
export const getTdtFailure = pathOr(null, ['features', 'get_tdt', 'tdt_error'])
