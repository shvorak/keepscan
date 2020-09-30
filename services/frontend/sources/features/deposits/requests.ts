import rest from 'shared/rest'

// TODO: Rename rest action
export const fetchTdtId = (lotSize: number) => rest.get('/deposit/random', {
    params: {
        lotSize
    }
})
