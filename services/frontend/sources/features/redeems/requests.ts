import rest from 'shared/rest'

export const loadRedeemsPage = (page: number, take: number = 10) =>
    rest.get('/redeem', {
        params: { page, take },
    })
