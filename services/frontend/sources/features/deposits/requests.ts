import rest from 'shared/rest'

export const loadDepositsPage = (page: number, take: number = 10, query: any = {}) =>
    rest.get('/deposit', {
        params: { page, take, ...query },
    })
