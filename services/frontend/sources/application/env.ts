export const ENV_CONFIG = {
    localhost: {
        net: 'mainNet',
        name: 'Testnet Dev',
        link: 'https://keepscan.com',
        label: 'Click to switch into Mainnet',
    },
    'keepscan.com': {
        net: 'mainNet',
        name: 'Mainnet',
        link: 'https://testnet.keepscan.com',
        label: 'Click to switch into Testnet',
    },
    'testnet.keepscan.com': {
        net: 'testNet',
        name: 'Testnet',
        link: 'https://keepscan.com',
        label: 'Click to switch into Mainnet',
    },
    'testnet.staging.keepscan.com': {
        net: 'testNet',
        name: 'Testnet Staging',
        link: 'https://mainnet.staging.keepscan.com',
        label: 'Click to switch into Mainnet Staging',
    },
    'mainnet.staging.keepscan.com': {
        net: 'mainNet',
        name: 'Mainnet Staging',
        link: 'https://testnet.staging.keepscan.com',
        label: 'Click to switch into Testnet Staging',
    },
}


export const HOST_ENV = (ENV_CONFIG[location.hostname] || ENV_CONFIG.localhost).net

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

// TODO: Replace with real lot sizes based on network and contract
export const LOT_SIZES = HOST_ENV === 'testNet' ? [0.001, 0.01, 0.1, 0.2, 0.5, 1] : [0.01, 0.1, 0.2, 0.5, 1, 5, 10]
