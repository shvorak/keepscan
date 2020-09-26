const path = require('path')

const paths = {
    root: path.resolve(__dirname, '../'),
    source: path.resolve(__dirname, '../sources'),
    bundle: path.resolve(__dirname, '../bundle')
}

const plugins = {
    Html: require('html-webpack-plugin')
}


module.exports = {
    entry: {
        index: './sources/index.tsx',
    },
    output: {
        path: paths.bundle,
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
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]',
                            },
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
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
    ],

}