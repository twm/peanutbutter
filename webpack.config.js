const webpack = require('webpack');
const ServerRenderPlugin = require('./src/server-render-webpack-plugin.js');

const baseConfig = {
    context: __dirname + '/src',
    module: {
        preLoaders: [{
            test: /\.js?$/,
            loaders: ['eslint'],
            exclude: /node_modules/,
        }],
        loaders: [
            {
                test: /\.svg$/,
                loaders: ['file'],
            },
            {
                test: /\.css$/,
                loaders: ['css'],
            },
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
            },
        ],
    },
};

const clientPlugins = [
    new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true,
    }),
    // new webpack.optimize.UglifyJsPlugin({}),
    new webpack.DefinePlugin({
        // 'process.env': { NODE_ENV: '"production"' },
    }),
];

// Multiple configs: http://webpack.github.io/docs/configuration.html#multiple-configurations
module.exports = [
    Object.assign({}, baseConfig, {
        entry: {
            'server': './server.js',
        },
        output: {
            path: __dirname + '/dist',
            filename: "[name].js",
        },
        plugins: [
            new ServerRenderPlugin(),
        ],
    }),
    Object.assign({}, baseConfig, {
        entry: {
            'client': './client.js',
        },
        output: {
            path: __dirname + '/dist',
            filename: "[name].js",
            library: 'render',
        },
        plugins: clientPlugins,
    }),
];
