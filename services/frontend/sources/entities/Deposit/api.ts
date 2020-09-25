import rest from '~/shared/rest'

export const fetchLatestDeposits = () => rest.get('/deposit/latest')
