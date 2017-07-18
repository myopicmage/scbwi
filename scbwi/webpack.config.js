const webpack = require('webpack');
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const path = require('path');

module.exports = env => {
    return [{
        stats: { modules: false },
        entry: {
            main: ['./src/index.tsx']
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                actions: path.resolve(__dirname, 'src/actions/'),
                components: path.resolve(__dirname, 'src/components/'),
                constants: path.resolve(__dirname, 'src/constants/'),
                epics: path.resolve(__dirname, 'src/epics/'),
                reducers: path.resolve(__dirname, 'src/reducers/'),
                store: path.resolve(__dirname, 'src/store/'),
                types: path.resolve(__dirname, 'src/types/'),
            }
        },
        output: {
            path: `${__dirname}/wwwroot/js`,
            publicPath: '/js/',
            filename: 'bundle.js'
        },
        module: {
            rules: [
                { test: /\.ts(x?)?$/, include: /src/, use: 'awesome-typescript-loader?silent=true' },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' }
                    ]
                }
            ]
        },
        devtool: 'inline-source-map',
        plugins: [
            new CheckerPlugin(),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/js/vendor-manifest.json')
            })
        ]
    }];
};