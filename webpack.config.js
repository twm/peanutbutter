const webpack = require('webpack');

module.exports = {
    context: __dirname + '/src',
    entry: './index.js',
    output: {
        path: __dirname,
        filename: "bundle.js",
    },
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'babel',
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
        }),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"' },
        }),
    ],
};
