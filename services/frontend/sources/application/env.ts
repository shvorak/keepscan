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

export const DAPP_CONFIG = {
    'keepscan.com': {
        host: 'https://dapp.tbtc.network'
    },
    'testnet.keepscan.com': {
        host: 'https://dapp.test.tbtc.network'
    },

    ByHost(hostname: string) {
        return DAPP_CONFIG[hostname] || DAPP_CONFIG['testnet.keepscan.com']
    }
}

export const HOST_ENV = location.hostname === 'keepscan.com' ? 'mainNet' : 'testNet'

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
