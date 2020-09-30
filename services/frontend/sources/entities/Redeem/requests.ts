import rest from 'shared/rest'

export const fetchLatestRedeems = () => rest.get('/redeem/latest')
