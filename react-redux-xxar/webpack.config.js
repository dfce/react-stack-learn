const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const proxy = require('http-proxy-middleware');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const ROOT_PATH  = path.resolve(__dirname);
const SRC_PATH   = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const PORT       = 3003;


module.exports = {
    entry: {
        app: path.resolve(SRC_PATH, 'index.js')
    },
    devtool: 'eval-sourece-map',
    output: {
        path: BUILD_PATH,
        // publicPath: ROOT_PATH,
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: BUILD_PATH,
        historyApiFallback: true,
        overlay: true,
        inline: true,
        port: PORT,
        hot: true,
        proxy: {
            '/ApiData/*': {
                target: 'http://localhost:8081/',
                changeOrigin: true,
                pathRewrite: {'^/ApiData': ''}
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '向向AR',
            filename: 'index.html',
            template: `${SRC_PATH}/template/index.html`,
            favicon: `${SRC_PATH}/static/imgs/xxar.ico`,
            inject: 'body'
        }),
        new webpack.BannerPlugin('版权所有，翻版必究！向向AR,@author: mofei'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('style.css')
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    },
    module: {
        rules: [
            {
                test : /\.jsx?$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader',
                    options : {
                        presets : ['env', 'react', 'stage-0']
                    }
                },
            }, {
                test : /\.js?$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader',
                    options : {
                        presets : ['env', 'react', 'stage-0']
                    }
                },
            }, {
                test : /\.scss$/,
                use : ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback : 'style-loader',
                    use : ['css-loader', 'sass-loader']
                }))
            }, {
                test : /\.css$/,
                use : ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback : 'style-loader',
                    use : 'css-loader'
                }))
            }, {
            test: /\.(png|jpg|gif)$/,
                use:[{
                    loader: 'url-loader',
                    options: {
                        limit: 8192 // 小于8KB 使用base64格式图片
                    }
                }]
            }, {
            test: /\.(mp3|webm|ogg)/,
                use: {
                    loader: 'file-loader',
                }
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
                loader: 'url-loader'
            }
        ]
    }
};