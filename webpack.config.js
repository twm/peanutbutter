const webpack = require('webpack');
const ServerRenderPlugin = require('./src/render-webpack-plugin.js');

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

// This plugin consumes the render.js bundle.  Its fileEmitter() method returns
// a plugin used in the client build to call render.js and build index.html.
// Any assets generated as a side effect of the server build are also output.
// XXX: Currently the SVG image is output twice...
const renderer = new ServerRenderPlugin();

// Multiple configs: http://webpack.github.io/docs/configuration.html#multiple-configurations
module.exports = [
    Object.assign({}, baseConfig, {
        entry: {
            'render': './render.js',
        },
        output: {
            path: __dirname + '/dist',
            filename: "[name].js",
            // Export the module as "var render = {...}"
            library: 'render',
            libraryTarget: 'var',
        },
        plugins: [renderer],
    }),
    Object.assign({}, baseConfig, {
        entry: {
            'client': './client.js',
        },
        output: {
            path: __dirname + '/dist',
            filename: "[name].[hash].js",
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: false,
                debug: true,
            }),
            new webpack.optimize.UglifyJsPlugin({}),
            new webpack.DefinePlugin({
                'process.env': { NODE_ENV: '"production"' },
            }),
            renderer.fileEmitter('index.html'),
        ],
    }),
];
