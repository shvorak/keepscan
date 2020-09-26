const {merge} = require('webpack-merge')
const environs = {
    development: require('./webpack.dev')
}

module.exports = (config, options) => {
    return merge(require('./webpack.base')(options), environs[options.mode] || {})
}
