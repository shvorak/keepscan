import rest from 'shared/rest'

export const fetchLatestRedeems = () => rest.get('/redeem/latest')


export const fetchRedeemById = (id: string) => rest.get(`/redeem/${id}`)
