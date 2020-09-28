import rest from '~/shared/rest'

export const fetchLatestDeposits = () => rest.get('/deposit/latest')

export const fetchDepositPage = (page: number) => rest.get('/deposit', {
    params: {
        page
    }
})


export const fetchDepositById = (id: string) => rest.get(`/deposit/${id}`)
