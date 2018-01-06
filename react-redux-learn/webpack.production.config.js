const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // entry: {
    //     app: [ "webpack-hot-middleware/client?reload=1", "./src/client/index.js" ]  //热加载 /** @desc 待验证 */
    // },
    devtool : 'eval-source-map', // 'source-map',                    // 打包选项：source maps
    entry: path.resolve(__dirname, 'app/index.js'),  // 打包的入口文件
    output: {                                       // 配置打包的结果，一个对象
        path: path.resolve(__dirname, 'build'),     // 定义输出文件路径，一个字符串
        filename: 'bundle.js',                      // 定义输出文件名，一个字符串 : 'js/[name].[hash:5].js', hash命名
        // publicPath : '/'
    },
    devServer:{
        contentBase: './build',         //本地服务器所加载的页面所在的目录；默认webpack-dev-server会为根文件夹提供本地服务器（本例设置到“./build"目录）
        historyApiFallback: true,       //不跳转!在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true,                   //设置为true，当源文件改变时会自动刷新页面
        port: 3001,                     //设置默认监听端口，如果省略，默认为”8080“
        hot: true                       //Hot Module Replacement 模块热替换
    },
    plugins:[   // 定义插件，一个数组
        new HtmlWebpackPlugin({                         // 模块热替换
            title    : 'react-redux-learn',
            filename : 'index.html',
            template : './template/index.html',
            favicon  : './app/static/images/favicon1.ico',
            inject   : 'body'
        }),
        new webpack.BannerPlugin('版权所有，翻版必究'),                 // 版权声明插件
        new webpack.optimize.OccurrenceOrderPlugin({minimize: true}), // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.UglifyJsPlugin(),                        // 压缩JS代码；
        new ExtractTextPlugin("css/[name].[hash:5].css")              // 分离CSS和JS文件
    ],
    resolve:{ //影响对模块的解析，一个对象
        extensions: [".js", ".json", ".jsx", ".css", ".scss"],//resolve.extensions并不是必须配置的，当不配置时，会使用默认值:["", ".webpack.js", ".web.js", ".js"]
    },
    module:{      //定义对模块的处理逻辑，一个对象
        // loaders:{},     //定义一系列的加载器，一个数组
        rules : [
            {
                test : /\.jsx?$/,
                exclude : /node_modules/,
                // include : '/',
                use : {
                    loader : 'babel-loader',
                    options : {
                        presets : ['env', 'react']
                    }
                },
            }, {
                test: /\.scss$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({ // css-hot-loader结局热替换CSS不自动刷新
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                }))
            }, {
                test: /\.css$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }))
            }, 
            // { 无ExtractTextPlugin 用法
            //     test : /\.css$/,    // 只针对.css
            //     use  : [
            //         {loader : "style-loader"}, {loader : "css-loader"}
            //     ]
            // },
            // {
            //     test : /\.scss$/,
            //     use : ExtractTextplugin.extract({
            //         falback : 'style-loader',
            //         use : ['css-loader', 'sass-loader']
            //     })
            // }
            /**@desc:: 其他为启用loaders */
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use:[{
            //         loader: 'url-loader',
            //         options: {
            //             limit: 8192 // 小于8KB 使用base64格式图片
            //         }
            //     }]
            // }, 
            // {
            //     test: /\.(mp3|webm|ogg)/,
            //     use: {
            //         loader: 'file-loader',
            //     }
            // }, {
            //     test: /\.json$/,
            //     loader: 'json-loader'
            // }, {
            //     test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
            //     loader: 'url-loader'
            // }
        ]
    }
    
};