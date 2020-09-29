import rest from "~/shared/rest";

export const fetchDepositsStat = () => rest.get('/statistic/deposits')
