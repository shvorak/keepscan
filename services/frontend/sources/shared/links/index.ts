

export const openTab = (url: string) => {
    window.open(url, 'blank')
}


const ETHERSCAN = {
    'keepscan.com': 'https://etherscan.io',
    'testnet.keepscan.com': 'https://ropsten.etherscan.io'
}

export const openEtherscan = (type: 'tx', address: string) => {
    const host = ETHERSCAN[location.hostname] || ETHERSCAN['testnet.keepscan.com']
    openTab(`${host}/tx/${address}`)
}
