const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        app: './src/app'
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.scss'],
        alias: {
            'react-native': 'react-native-web'
        }
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/assets/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            // Most react-native libraries include uncompiled ES6 JS.
            test: /\.js$/,
            include: [
                /node_modules\/react-native-/,
                /node_modules\/react-router-native/,
                /node_modules\/@indec/
            ],
            loader: 'babel-loader',
            query: {
                presets: ['react-app'],
                cacheDirectory: '.babel-cache'
            }
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader?outputStyle=compressed', 'resolve-url-loader', 'sass-loader?sourceMap']
            })
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
            options: {name: '[name].[ext]', limit: 10000}
        }, {
            test: /\.(jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
            options: {name: '[name].[ext]'}
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require('./package.json').version),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            ENDPOINT: JSON.stringify(global.config.endpoint)
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor'),
        //new webpack.optimize.UglifyJsPlugin(),
        new CaseSensitivePathsPlugin(),
        new ExtractTextPlugin('[name].bundle.css')
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
