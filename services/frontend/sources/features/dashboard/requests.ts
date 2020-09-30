import rest from "~/shared/rest";

export const fetchRedeemsStat = () => rest.get('/statistic/redeems')
export const fetchDepositsStat = () => rest.get('/statistic/deposits')
