import { queryList } from 'shared/queries'
import { Network } from 'entities/Network/types'

const getLastBlock = (networkKind: 1 | 2) => (state) => {
    const network = queryList<Network>('entities.network')(state)
        .find(x => x.kind === networkKind)

    return network && network.lastBlock
}


export const getEthereumLastBlock = getLastBlock(1)
