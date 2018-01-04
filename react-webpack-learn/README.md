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

## 安装与配置Babel

##   简介

*   Babel 是一个通用的多用途 JavaScript 编译器。
#    拆分成几个核心包，babel-core, babel-node, babel-cli...
#    没有了默认的转换，现在你需要手动的添加 plugin。也就是插件化
#    添加了 preset，也就是预置条件。
#    增加了 .babelrc 文件，方便自定义的配置。

#   Babel 能做什么？
*   Babel 通过语法转换来支持最新版本的 JavaScript （ES6），而不用等待浏览器的支持。
*   Babel 可以转换 React 的 JSX 语法和删除类型注释。
*   Babel 是由插件构建的。因此，你可以根据自己的需要订制。
*   支持 source map ，所以您可以轻松调试您编译的代码。

#   Babel 不能做什么？
*   Babel 只转换语法（如箭头函数），不支持新的全局变量。但是，您可以使用 babel-polyfill 来辅助支持。

##  包
*   babel-core
*   babel-cli
*   babel-external-helpers
*   babel-node
*   babel-register
*   babel-runtime
*   babel-polyfill

#   babel-core :babel 的核心包，包括核心 api，比如 transform，主要是处理转码的。 它会把我们的 js 代码，抽象成 ast，即 abstract syntax tree 的缩写，是源代码的抽象语法结构的树状表现形式。
*   主要API:
```
var babel = require('babel-core');
var transform = babel.transform;
// babel.transform(code: string, options?: Object)
transform("code", options) // => { code, map, ast }
// babel.transformFile(filename: string, options?: Object, callback: Function)
var path = require('path');
var result = babel.transformFileSync(
    path.resolve(__dirname, './test.js'),
    {
        presets: ['env'],
        plugins: ['transform-runtime'],
    },
    function(err, result) {// { code, map, ast }
        console.log(result);
    });
// babel.transformFileSync(filename: string, options?: Object)
var result = babel.transformFileSync(
    path.resolve(__dirname, './test.js'),
    {
        presets: ['env'],
        plugins: ['transform-runtime'],
    }
);
// babel.transformFromAst(ast: Object, code?: string, options?: Object)
// 把 ast 传入，解析为 code 代码
```

##   babel-cli   提供命令行运行 babel

##   babel-external-helpers
*   babel-cli 中的一个 command，用来生成 helper 函数。
*   babel 有很多辅助函数，例如 toArray 函数， jsx 转化函数。这些函数是 babel transform 的时候用的，都放在 babel-helpers 这个包中。如果 babel 编译的时候检测到某个文件需要这些 helpers，
*   在编译成模块的时候，会放到模块的顶部。

*   但是如果多个文件都需要提供，会重复引用这些 helpers，会导致每一个模块都定义一份，代码冗余。所以 babel 提供了这个命令，用于生成一个包含了所有 helpers 的 js 文件，
*   用于直接引用。然后再通过一个 plugin，去检测全局下是否存在这个模块，存在就不需要重新定义了。
 
#   1:使用：执行 babel-external-helpers 生成 helpers.js 文件
```
node_modules/.bin/babel-external-helpers > helpers.js
```

#   2:安装: plugin
```
npm install --save-dev babel-plugin-external-helpers
```

#   3:配置 babel 
```
{
    "plugins": ["external-helpers"]
}
```

#   4:入口文件引入 helpers
```
require('./helpers.js');
如果使用了 transform-runtime，就不需要生成 helpers.js 文件了，这个在后面的 babel-runtime 再说。
```

##   babel-node
#   也是 babel-cli 下面的一个 command，主要是实现了 node 执行脚本和命令行写代码的能力。

##   babel-register
#   通过改写 node 本身的 require，添加钩子，然后在 require 其他模块的时候，就会触发 babel 编译。也就是你引入 require('babel-register') 的文件代码，是不会被编译的。
#   只有通过 require 引入的其他代码才会。
```
npm install babel-register --save-dev
```
```
require('babel-register')({ presets: ['react'] });
require('./test')
```
*   它的特点就是实时编译，不需要输出文件，执行的时候再去编译。所以它很适用于开发。总结一下就是，多用在 node 跑程序，做实时编译用的，通常会结合其他插件作编译器使用，比如 mocha 做测试的时候。

##   babel-runtime
```
npm install babel-runtime --save
```

*   Babel 转译后的代码要实现源代码同样的功能需要借助一些帮助函数。可能会重复出现在一些模块里，导致编译后的代码体积变大。Babel 为了解决这个问题，提供了单独的包 babel-runtime 
*   供编译模块复用工具函数。（core-js 和 regenerator）
*   启用插件 babel-plugin-transform-runtime 后，Babel 就会使用 babel-runtime 下的工具函数，转译代码如下：
```
'use strict';
// 之前的 _defineProperty 函数已经作为公共模块 `babel-runtime/helpers/defineProperty` 使用
var _defineProperty2 = require('babel-runtime/helpers/defineProperty');
var _defineProperty3 = _interopRequireDefault(_defineProperty2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var obj = (0, _defineProperty3.default)({}, 'name', 'JavaScript');
```

*   除此之外，babel 还为源代码的非实例方法（Object.assign，实例方法是类似这样的 "foobar".includes("foo")）和 babel-runtime/helps 下的工具函数自动引用了 polyfill。
*   这样可以避免污染全局命名空间，非常适合于 JavaScript 库和工具包的实现。例如 const obj = {}, Object.assign(obj, { age: 30 }); 转译后的代码如下所示：
```
'use strict';
// 使用了 core-js 提供的 assign
var _assign = require('babel-runtime/core-js/object/assign');
var _assign2 = _interopRequireDefault(_assign);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var obj = {};
(0, _assign2.default)(obj, {
  age: 30
});
```
#   babel-runtime 适合 JavaScript 库和工具包实现
*   避免 babel 编译的工具函数在每个模块里重复出现，减小库和工具包的体积；
*   在没有使用 babel-runtime 之前，库和工具包一般不会直接引入 polyfill。否则像 Promise 这样的全局对象会污染全局命名空间，这就要求库的使用者自己提供 polyfill。
    这些 polyfill 一般在库和工具的使用说明中会提到，比如很多库都会有要求提供 es5 的 polyfill。在使用 babel-runtime 后，库和工具只要在 package.json 中增加依赖 babel-runtime，
    交给 babel-runtime 去引入 polyfill 就行了；  

##  core.js
*   core-js 是用于 JavaScript 的组合式标准化库，它包含 ES5 （e.g: object.freeze）, ES6 的 Promise，Symbols, Collections, Iterators, Typed arrays， es7+提案等等的 polyfills 实现。

##  regenerator
*   它是来自于 facebook 的一个库，链接。主要就是实现了 generator/yeild， async/await。
*   所以 babel-runtime 是单纯的实现了 core-js 和 regenerator 引入和导出，比如这里是 filter 函数的定义，做了一个中转并处理了 esModule 的兼容。

##  babel-polyfill
*   Babel 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法
*   （比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。

*   不同于 babel-runtime 的是，babel-polyfill 是一次性引入你的项目中的，就像是 React 包一样，同项目代码一起编译到生产环境。
#   注意：babel

##  transform-runtime 和  babel-polyfile
*   babel-polyfill 是当前环境注入这些 es6+ 标准的垫片，好处是引用一次，不再担心兼容，而且它就是全局下的包，代码的任何地方都可以使用。缺点也很明显，它可能会污染原生的一些方法而把原生的方法重写。
    如果当前项目已经有一个 polyfill 的包了，那你只能保留其一。而且一次性引入这么一个包，会大大增加体积。如果你只是用几个特性，就没必要了，如果你是开发较大的应用，而且会频繁使用新特性并考虑兼容，
    那就直接引入吧。

*   transform-runtime 是利用 plugin 自动识别并替换代码中的新特性，你不需要再引入，只需要装好 babel-runtime 和 配好 plugin 就可以了。好处是按需替换，检测到你需要哪个，就引入哪个 polyfill，
    如果只用了一部分，打包完的文件体积对比 babel-polyfill 会小很多。而且 transform-runtime 不会污染原生的对象，方法，也不会对其他 polyfill 产生影响。所以 transform-runtime 的方式 更适合
    开发工具包，库，一方面是体积够小，另一方面是用户（开发者）不会因为引用了我们的工具，包而污染了全局的原生方法，产生副作用，还是应该留给用户自己去选择。缺点是随着应用的增大，相同的 polyfill 
    每个模块都要做重复的工作（检测，替换），虽然 polyfill 只是引用，编译效率不够高效。

##  plugin
#   babel-plugin-transform-runtime
*   transform-runtime 是为了方便使用 babel-runtime 的，它会分析我们的 ast 中，是否有引用 babel-rumtime 中的垫片（通过映射关系），如果有，就会在当前模块顶部插入我们需要的垫片。
    配置：
```
// 默认值
{
  "plugins": [
    ["transform-runtime", {
      "helpers": true,
      "polyfill": true,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
}
```
    如果你只需要用 regenerator，不需要 core-js 里面的 polyfill 那你就可以在 options 中把 polyfill 设为 false。helpers 设为 false，就相当于没有启用 babel-plugin-external-helpers 的效果，
    比如翻译 async 的时候，用到了 asyncToGenerator 函数，每个文件还会重新定义一下。moduleName 的话，就是用到的库，你可以把 babel-runtime 换成其他类似的。

##  presets
    presets 就是 plugins 的组合，你也可以理解为是套餐
*   env
*   es2015
*   react
*   lastet
*   stage-x

*   babel-preset-lastet（包括 es2105，es2016，es2017）跟默认情况下的 env 是一样的，也就是说包括 lastest 在内，这四个 presets 都要被 babel-preset-env 代替。即：     
##  babel-preset-env
*   它能根据当前的运行环境，自动确定你需要的 plugins 和 polyfills。通过各个 es 标准 feature 在不同浏览器以及 node 版本的支持情况，再去维护一个 feature 跟 plugins 之间的映射关系，
    最终确定需要的 plugins。

*   注意: babel-preset-env 并不是包括所有的 babel-preset-es 和 babel-preset-stag，而是所有的 babel-preset-es 和 babel-preset-stag-4 详情请看这里  :
```
//.babelrc

{
  "presets": [
    [
      "env",
      {
        "targets": { // 配支持的环境
          "browsers": [ // 浏览器
            "last 2 versions",
            "safari >= 7"
          ],
          "node": "current"
        },
        "modules": true,  //设置ES6 模块转译的模块格式 默认是 commonjs
        "debug": true, // debug，编译的时候 console
        "useBuiltIns": false, // 是否开启自动支持 polyfill
        "include": [], // 总是启用哪些 plugins
        "exclude": []  // 强制不启用哪些 plugins，用来防止某些插件被启用
      }
    ]
  ],
  plugins: [
    "transform-react-jsx" //如果是需要支持 jsx 这个东西要单独装一下。
  ]
}
```

##  useBuiltIns
*   env 会自动根据我们的运行环境，去判断需要什么样的 polyfill，而且，打包后的代码体积也会大大减小，但是这一切都在使用 useBuiltIns，而且需要你安装 babel-polyfill，并 import。
    它会启用一个插件，替换你的import 'babel-polyfill'，不是整个引入了，而是根据你配置的环境和个人需要单独的引入 polyfill。

##  总结

*   具体项目还是需要使用 babel-polyfill 配合 useBuiltIns，只使用 babel-runtime 的话，实例方法不能正常工作（例如 "foobar".includes("foo")）；
    JavaScript 库和工具可以使用 babel-runtime 配合 babel-plugin-transform-runtime，在实际项目中使用这些库和工具，需要该项目本身提供 polyfill；