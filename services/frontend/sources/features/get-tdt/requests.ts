// TODO: Rename rest action
import rest from 'shared/rest'

export const fetchTdtId = (lotSize: number) =>
    rest.get('/deposit/random', {
        params: {
            lotSize,
        },
    })
