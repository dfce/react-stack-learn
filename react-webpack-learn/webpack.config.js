var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'app/main.js'),  // 打包的入口文件
    output: {                                       // 配置打包的结果，一个对象
        path: path.resolve(__dirname, 'build'),     // 定义输出文件路径，一个字符串
        filename: 'bundle.js',                      // 定义输出文件名，一个字符串
    },
    devServer:{
        contentBase: './build',         //本地服务器所加载的页面所在的目录 
        historyApiFallback: true,       //不跳转
        inline: true,                   //
        port: 3001,                     //
        hot: true                       //
    },
    plugins:[   // 定义插件，一个数组
        new HtmlWebpackPlugin()
    ],
    resolve:{ //影响对模块的解析，一个对象
        //resolve.extensions并不是必须配置的，当不配置时，会使用默认值:["", ".webpack.js", ".web.js", ".js"]
        extensions: [".js", ".json", ".jsx", ".css", ".scss"],
    },
    module:{      //定义对模块的处理逻辑，一个对象
        // loaders:{},     //定义一系列的加载器，一个数组
    }
    
};