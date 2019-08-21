const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const htmlPlugin = new HtmlWebpackPlugin({
    // 生成的html的title
    title: 'Sycamore',
    // 生成的html的文件名
    filename: 'index.html',
    // 注入bundle到body中
    inject: 'body',
    favicon: './src/assets/favicon.ico'
});

const config = {
    entry: {
        app: './src/main.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader', 'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg|ttf)$/,
                loader: 'url-loader'
            },
            {
                test: /\.md$/,
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        htmlPlugin,
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/style.css",
            chunkFilename: "css/[name].css"
        })
    ],
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
        alias: {
            "@src": path.resolve("src"),
            "@component": path.resolve("src/component"),
            "@pages": path.resolve("src/pages"),
            "@assets": path.resolve("src/assets"),
            "@utils": path.resolve("src/utils"),
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
                vendor: {
                    // 使用正则匹配所有加载路径为 node_modules 路径下的模块
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: "initial"
                },
            }
        },
        minimizer: [
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
                canPrint: true
            }),
        ]
    }
};


module.exports = config;