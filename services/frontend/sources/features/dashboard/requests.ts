import rest from "~/shared/rest";

export const fetchSupplyStat = () => rest.get('/statistic/supply')
export const fetchRedeemsStat = () => rest.get('/statistic/redeems')
export const fetchExchangeRate = () => rest.get('/statistic/exchange-rate')
export const fetchDepositsStat = () => rest.get('/statistic/deposits')
export const fetchOperationsStat = () => rest.get('/statistic/operations')
