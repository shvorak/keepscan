const { merge } = require('webpack-merge')

const environs = {
    development: require('./webpack.dev'),
}

module.exports = (config, options) => {
    let configs = environs[options.mode] || {}
    try {
        configs = merge(configs, require('./webpack.local'))
    } catch (e) {}

    return merge(require('./webpack.base')(options), configs)
}
