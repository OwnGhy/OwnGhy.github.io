const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    output: {
        chunkFilename: '[name].js',
        filename: '[name].js',
        path: path.resolve(__dirname, './dist/')
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.min.js'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server',
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 8888,
        //     reportFilename: 'report.html',
        //     defaultSizes: 'parsed',
        //     openAnalyzer: true,
        //     generateStatsFile: false,
        //     statsFilename: 'stats.json',
        //     statsOptions: null,
        //     logLevel: 'info'
        // })
    ],
    devtool: '#source-map',
});