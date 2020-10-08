import { INDEXERS } from '~/application/env'
import { stringifyUrl } from 'query-string'

const getNetworkName = (address: string) => (address && address.match(/^0x/) ? 'ethereum' : 'bitcoin')
export const getNetworkLink = (
    address: string,
    kind: 'address' | 'token' | 'tx' = 'address',
    params: Record<string, any>
) => {
    const network = getNetworkName(address)
    const baseUrl = INDEXERS[network]

    return stringifyUrl({
        query: params,
        url: `${baseUrl}/${kind}/${address}`,
    })
}
