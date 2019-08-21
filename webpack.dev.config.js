const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: '#eval-source-map',
    output: {
        publicPath: "/",
        chunkFilename: '[name].js',
        filename: '[name].js',
        path: path.resolve(__dirname, './dist/')
    },
    devServer: {
        port: '8180',
        noInfo: true,
        open: true
    }
});