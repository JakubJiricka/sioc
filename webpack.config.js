const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        app: [
            'webpack-hot-middleware/client',
            'react-hot-loader/patch',
            './src/app'
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.scss'],
        alias: {
            'react-native': 'react-native-web'
        }
    },
    output: {
        path: path.join(__dirname, 'public/assets'),
        publicPath: '/assets/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'react-hot-loader/webpack'
            }, {
                loader: 'babel-loader', options: {cacheDirectory: '.babel-cache'}
            }]
        }, {
            test: /\.js$/,
            include: [
                /node_modules\/react-native-/,
                /node_modules\/react-router-native/
            ],
            loader: 'babel-loader',
            query: {
                presets: ['react-app'],
                cacheDirectory: '.babel-cache'
            }
        }, {
            test: /\.scss$/,
            loader: [
                'css-hot-loader'
            ].concat(
                ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
                })
            )
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'resolve-url-loader']
        }, {
            exclude: [
                /\.html$/,
                /\.(js|jsx)$/,
                /\.json$/,
                /\.s?css$/,
                /\.(jpg|png)/
            ],
            loader: 'url-loader',
            options: {name: '[name].[ext]', limit: 30000}
        }, {
            test: /\.(jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
            options: {name: '[name].[ext]'}
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require('./package.json').version),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            ENDPOINT: JSON.stringify(require('./config.json').endpoint)
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor'),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new ExtractTextPlugin('[name].bundle.css')
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
