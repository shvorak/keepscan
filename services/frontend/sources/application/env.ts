export const ENV_CONFIG = {
    localhost: {
        name: 'Testnet Dev',
        link: 'https://keepscan.com',
        label: 'Click to switch into Mainnet',
    },
    'keepscan.com': {
        name: 'Mainnet',
        link: 'https://testnet.keepscan.com',
        label: 'Click to switch into Testnet',
    },
    'testnet.keepscan.com': {
        name: 'Testnet',
        link: 'https://keepscan.com',
        label: 'Click to switch into Mainnet',
    },
}


export const HOST_ENV = location.hostname === 'keepscan.com' ? 'mainNet' : 'testNet'

export const DAPP_CONFIG = {
    mainNet: 'https://dapp.tbtc.network',
    testNet: 'https://dapp.test.tbtc.network'
}

export const DAPP = DAPP_CONFIG[HOST_ENV]

export const INDEXERS_CONFIG = {
    mainNet: {
        bitcoin: 'https://blockstream.info',
        ethereum: 'https://etherscan.io'
    },
    testNet: {
        bitcoin: 'https://blockstream.info/testnet',
        ethereum: 'https://ropsten.etherscan.io'
    }
}

export const INDEXERS = INDEXERS_CONFIG[HOST_ENV]
