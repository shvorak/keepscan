const path = require('path')

const paths = {
    root: path.resolve(__dirname, '../'),
    source: path.resolve(__dirname, '../sources'),
    bundle: path.resolve(__dirname, '../bundle'),
}

const plugins = {
    Html: require('html-webpack-plugin'),
    Copy: require('copy-webpack-plugin'),
    Define: require('webpack').DefinePlugin,
    Terser: require('terser-webpack-plugin'),
    ExtractCss: require('mini-css-extract-plugin'),
}

module.exports = (options) => {
    const isDevelopment = options.mode === 'development'
    const isProduction = options.mode === 'production'
    return {
        mode: options.mode,
        entry: {
            index: './sources/index.tsx',
        },
        output: {
            path: paths.bundle,
            publicPath: '/',
            filename: '[name]-[hash].js',
        },
        module: {
            rules: [
                {
                    use: 'ts-loader',
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                },
                {
                    test: /\.(css|less)$/,
                    use: [
                        isDevelopment ? 'style-loader' : plugins.ExtractCss.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: isDevelopment
                                        ? '[name]__[local]_[hash:base64:5]'
                                        : '[hash:base64:12]',
                                },
                            },
                        },
                        'less-loader',
                    ].filter(Boolean),
                },
                {
                    test: /\.(svg)/,
                    loader: 'url-loader',
                },
                {
                    test: /\.(png|jpe?g|gif|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    loader: 'file-loader',
                },
            ],
        },
        context: paths.root,
        // devtool: isDevelopment && 'inline-source-map',
        resolve: {
            alias: {
                '~': paths.source,
                uikit: path.resolve(paths.source, 'uikit'),
                shared: path.resolve(paths.source, 'shared'),
                static: path.resolve(paths.source, 'static'),
                features: path.resolve(paths.source, 'features'),
                entities: path.resolve(paths.source, 'entities'),
                components: path.resolve(paths.source, 'components'),
            },
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new plugins.Html({
                template: path.join(paths.source, 'index.ejs'),
            }),
            new plugins.Define({
                'process.env.NODE_ENV': JSON.stringify(options.mode),
            }),
            new plugins.Copy({
                patterns: [{ from: 'sources/static/favicons/', to: paths.bundle }],
            }),
            new plugins.ExtractCss()
        ],
        optimization: {
            splitChunks: {
                chunks: 'initial'
            }
        },
    }
}
