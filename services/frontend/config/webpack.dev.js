module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        proxy: {
            '/api': { target: 'https://keepscan.com', secure: false },
            // '/api': { target: 'https://testnet.keepscan.com', secure: false },
            // '/api': { target: 'https://localhost:5001', secure: false },
        },
        overlay: true,
        historyApiFallback: true
    }
}
