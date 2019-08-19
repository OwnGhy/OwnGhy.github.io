const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: '#eval-source-map',
    output: {
        publicPath: "/",
        chunkFilename: '[name].[hash].js',
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, './dist/')
    },
    devServer: {
        noInfo: true,
        open: true
    }
});