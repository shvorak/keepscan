module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        proxy: {
            '/api': { target: 'https://keepscan.com', secure: false }
        }
    }
}
