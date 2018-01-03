##  【webpack 环境搭建】

## 下载完整包直接执行：
```
npm install
npm run dev
```
打开：http://localhost:3001/ 查看


## 初始化文件夹
```
mkdir react-webpack-learn
cd  react-webpack-learn
npm install -y
```
*   这样就生成package.json文件：内容如下：
```
{
  "name": "react-webpack-learn",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## 安装webpack
*   运行安装命令：
```
npm install --save-dev webpack
```

## 配置webpack
*   新建文件 webpack.config.js,输入内容：
```
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'app/main.js'),  // 唯一入口文件
    output: {
        path: path.resolve(__dirname, 'build'),     // 编译自动生成文件目录
        filename: 'bundle.js',                      // 生成文件名
    },
};
```

## 测试HelloWorld
*   现在简单配置后，可以写一个没有React的 Hello World 了!
*   app/component.js 代码：
```
'use strict';

module.exports = () => {
        var element = document.createElement('h1');
        element.innerHTML = "Hello World ! <br/> this's react webpack learning start ..."

        return element
    }
```
*   现在运行 webpack 编译文件的话，会有一个 bundle.js，不过还是没有 html 文件来启动项目，打开 build/index.html 加入以下内容：
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```
*   注：我们没有全局安装npm install -g webpack、也没有添加到path，所以使用webpack只能在./node_modules/.bin/webpack运行；推荐解决方案：package.json 里面添加 script，然后就可以运行项目内局部
*   webpack 了.      npm run build
```
{
    "name": "xxx",
    "version": "xxx",
    "scripts": {
        "build": "webpack --config webpack.config.js",
    }
}
```


##   现在可以在控制台输入 webpack 来编译输出了，webpack 命令会自动生成一个build/bundle.js 文件，然后用浏览器打开 build/index.html 就可以看见 Hello World 了。
##   不过我们要使用 html-webpack-plugin 来生成这个 build/index.html 文件。

#   使用html-webpack-plugin
*   删除原先的build/* 文件：
```
rm -rf build/*
```

## 安装html-webpack-plugin:
```
npm install --save-dev html-webpack-plugin
```   

*   打开文件webpack.config.js修改为以下内容：
```
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'app/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    plugins:[
        new HtmlWebpackPlugin()
    ]
};
```

*   现在输入 npm run build 就可以编译了。至此，第一步 webpack 环境搭建完成。




##  【webpack 工作流】
#   设置webpack-dev-server
#   安装：
```
npm install webpack-dev-server --save-dev
```
*   修改 package.json 文件 "scripts" 部分包含这个指令：
```
{
    ...
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",  // test 可以删除
        "build": "webpack --progress --colors --config webpack.config.js",
        "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build"
    },
    ...
}
```
#   这时候，运行 npm run dev，会启动一个 Web 服务器，然后监听文件修改，然后自动重新合并你的代码。打开浏览器，访问 http://localhost:8080 会看到Hello World...。

##  模块热替换
*   现在所有代码在作出修改后，就会由 webpack-dev-server 自动编译替换，不过浏览器还是要刷新才能看到替换效果。
*   模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。

*   在 webpack 版本更新到 3.0.0 之后，热加载配置方法有所改动。
*   打开 webpack.config.js 修改内容：
```
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
        port: 8080,                     //
        hot: true                       //
    },
    plugins:[   // 定义插件，一个数组
        new HtmlWebpackPlugin()
    ],
    resolve:{},     //影响对模块的解析，一个对象
    module:{},      //定义对模块的处理逻辑，一个对象
    loaders:{},     //定义一系列的加载器，一个数组
    extensions:{}   //自动补全识别后缀，是一个数组
};
```
*   保存后重新运行 npm run dev 打开 http://localhost:8080 这时候，修改 app/component.js 中的内容。保存后，浏览器就会自动刷新，并且显示修改后的结果了。至此，webpack 工作流完成。


