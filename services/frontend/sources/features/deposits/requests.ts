import rest from 'shared/rest'

export const loadDepositsPage = (page: number, take: number = 10) =>
    rest.get('/deposit', {
        params: { page, take },
    })
