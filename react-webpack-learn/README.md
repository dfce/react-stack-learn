#  【webpack 环境搭建】

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

###   使用html-webpack-plugin
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
##  html-webpack-plugin 参数说明
*   title           :   title值用于生成的HTML文档。
*   filename        :   将生成的HTML写入到该文件中。默认写入到index.html中。你也可以在这儿指定子目录 (eg: assets/admin.html)。
*   template        :   Webpack require path 到 template中。
*   inject          :   ture | 'head' | 'body' | false 添加所有的静态资源（assets）到模板文件或templateContent.当传入true或'body'时，所有javascript资源将被放置到body 元素的底部。
                        当传入'head'时， 所有的脚本将被放置到head元素中。
*   favicon         :   添加指定的favicon path 到输出的html文件。

*   minify          ：  {...} | false 传入一个html-minifier 对象选项来压缩输出的html文件。 
*   hash            :   true | false 如果值为true，就添加一个唯一的webpack compilation hash给所有已included的 scripts 和 CSS 文件。这对缓存清除（cache busting）十分有用。
*   cache           :   true | false 如果为true (默认)，只要文件被更改了就emit(发表)文件。  
*   showErrors      :   true | false如果为true (默认)，详细的错误信息将被写入到HTML页面。 
*   chunksSortMode  :   在chunks被include到html文件中以前，允许你控制chunks 应当如何被排序。允许的值: 'none' | 'auto' | 'dependency' | {function} - 默认值: 'auto'。 
*   encludeChunks   :   允许你跳过某些chunks (e.g. don't add the unit-test chunk)
*   xhtml           :   true | false 如果为true， 将 link 标签渲染为自闭合标签, XHTML compliant。 默认是 false。    





##  【webpack 工作流】
###   设置webpack-dev-server
###   安装：
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
        "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build" // --open 选项是否直接打开
    },
    ...
}
```
###   这时候，运行 npm run dev，会启动一个 Web 服务器，然后监听文件修改，然后自动重新合并你的代码。打开浏览器，访问 http://localhost:8080 会看到Hello World...。

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
        new webpack.BannerPlugin('版权所有，翻版必究')   // 版权声明插件
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
###    拆分成几个核心包，babel-core, babel-node, babel-cli...
###    没有了默认的转换，现在你需要手动的添加 plugin。也就是插件化
###    添加了 preset，也就是预置条件。
###    增加了 .babelrc 文件，方便自定义的配置。

###   Babel 能做什么？
*   Babel 通过语法转换来支持最新版本的 JavaScript （ES6），而不用等待浏览器的支持。
*   Babel 可以转换 React 的 JSX 语法和删除类型注释。
*   Babel 是由插件构建的。因此，你可以根据自己的需要订制。
*   支持 source map ，所以您可以轻松调试您编译的代码。

###   Babel 不能做什么？
*   Babel 只转换语法（如箭头函数），不支持新的全局变量。但是，您可以使用 babel-polyfill 来辅助支持。

##  包
*   babel-core
*   babel-cli
*   babel-external-helpers
*   babel-node
*   babel-register
*   babel-runtime
*   babel-polyfill

###   babel-core :babel 的核心包，包括核心 api，比如 transform，主要是处理转码的。 它会把我们的 js 代码，抽象成 ast，即 abstract syntax tree 的缩写，是源代码的抽象语法结构的树状表现形式。
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
 
###   1:使用：执行 babel-external-helpers 生成 helpers.js 文件
```
node_modules/.bin/babel-external-helpers > helpers.js
```

###   2:安装: plugin
```
npm install --save-dev babel-plugin-external-helpers
```

###   3:配置 babel 
```
{
    "plugins": ["external-helpers"]
}
```

###   4:入口文件引入 helpers
```
require('./helpers.js');
如果使用了 transform-runtime，就不需要生成 helpers.js 文件了，这个在后面的 babel-runtime 再说。
```

##   babel-node
###   也是 babel-cli 下面的一个 command，主要是实现了 node 执行脚本和命令行写代码的能力。

##   babel-register
###   通过改写 node 本身的 require，添加钩子，然后在 require 其他模块的时候，就会触发 babel 编译。也就是你引入 require('babel-register') 的文件代码，是不会被编译的。
###   只有通过 require 引入的其他代码才会。
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
###   babel-runtime 适合 JavaScript 库和工具包实现
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
###   注意：babel

##  transform-runtime 和  babel-polyfile
*   babel-polyfill 是当前环境注入这些 es6+ 标准的垫片，好处是引用一次，不再担心兼容，而且它就是全局下的包，代码的任何地方都可以使用。缺点也很明显，它可能会污染原生的一些方法而把原生的方法重写。
    如果当前项目已经有一个 polyfill 的包了，那你只能保留其一。而且一次性引入这么一个包，会大大增加体积。如果你只是用几个特性，就没必要了，如果你是开发较大的应用，而且会频繁使用新特性并考虑兼容，
    那就直接引入吧。

*   transform-runtime 是利用 plugin 自动识别并替换代码中的新特性，你不需要再引入，只需要装好 babel-runtime 和 配好 plugin 就可以了。好处是按需替换，检测到你需要哪个，就引入哪个 polyfill，
    如果只用了一部分，打包完的文件体积对比 babel-polyfill 会小很多。而且 transform-runtime 不会污染原生的对象，方法，也不会对其他 polyfill 产生影响。所以 transform-runtime 的方式 更适合
    开发工具包，库，一方面是体积够小，另一方面是用户（开发者）不会因为引用了我们的工具，包而污染了全局的原生方法，产生副作用，还是应该留给用户自己去选择。缺点是随着应用的增大，相同的 polyfill 
    每个模块都要做重复的工作（检测，替换），虽然 polyfill 只是引用，编译效率不够高效。

##  plugin
###   babel-plugin-transform-runtime
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



##  WebPack 其他高级功能【比如下面的：loaders 和 plugins】  
###   这些功能其实都可以通过命令行模式实现，但是正如前面提到的，这样不太方便且容易出错的，更好的办法是定义一个配置文件，这个配置文件其实也是一个简单的JavaScript模块，
###   我们可以把所有的与打包相关的信息放在里面。


##  WebPack 的一下强大功能
##   生成 Source Maps (使调试更容易)
*   开发时总是离不开调试方便的调试能极大的提高开发效率，不过有时候通过打包后的文件，你是不容易找到出错了的地方，对应的你写的代码的位置的，Source Maps就是来帮我们解决这个问题的。
*   通过简单的配置，webpack就可以在打包时为我们生成的source maps，这为我们提供了一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试。
*   在webpack的配置文件中配置source maps，需要配置devtool，它有以下四种不同的配置选项，各具优缺点，描述如下：
*   devtool选项	                                                配置结果
*   source-map	                    在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度；
*   cheap-module-source-map	        在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；
*   eval-source-map	                使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有
*                                   性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；
*   cheap-module-eval-source-map	这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；

###   *正如上所述：上述选项从上到下打包速度越来越快，不过同时也潜藏越多的负面作用，较快的打包速度的后果就是对打包后的文件的的执行有一定影响。对小到中型的项目中，eval-source-map是一个很好的选项，
###    再次强调你只应该开发阶段使用它，我们继续对上文新建的webpack.config.js，进行如下配置:
```
module.exports = {
    devtool : 'eval-source-map',                    // 打包选项：source maps
    entry: path.resolve(__dirname, 'app/main.js'),  // 打包的入口文件
    output: {                                       // 配置打包的结果，一个对象
        path: path.resolve(__dirname, 'build'),     // 定义输出文件路径，一个字符串
        filename: 'bundle.js',                      // 定义输出文件名，一个字符串
    },
}
```
*   cheap-module-eval-source-map方法构建速度更快，但是不利于调试，推荐在大型项目考虑时间成本时使用。

##  Loaders 
###   Loaders是webpack提供的最激动人心的功能之一了。通过使用不同的loader，webpack有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换scss为css，或者把下一代的JS文件（ES6，ES7)
###   转换为现代浏览器兼容的JS文件，对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。

#   Loaders需要单独安装并且需要在webpack.config.js中的modules关键字下进行配置，Loaders的配置包括以下几方面：
*   test    :   用以匹配loaders所处理文件的扩展名的正则表达式【必须】
*   loader  :   loader的名称【必须】
*   include/exculde :   手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）【可选】
*   query   :   为loader提供额外的设置选项【可选】


##  一切皆模块
###   Webpack有一个不可不说的优点，它把所有的文件都都当做模块处理，JavaScript代码，CSS和fonts以及图片等等通过合适的loader都可以被处理。

##  CSS

###   webpack提供两个工具处理样式表，css-loader 和 style-loader，二者处理的任务不同，css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
*   安装
```
npm install --save-dev style-loader css-loader
```
*   使用 ；注意这里对同一个文件引入多个loader的方法.通常情况下，css会和js打包到同一个文件中，并不会打包为一个单独的css文件，不过通过合适的配置webpack也可以把css打包为单独的文件的。
```
 rules : [
            {
                test : /\.jsx?$/,
                use : {
                    loader : 'babel-loader',
                    // options : {
                    //     presets : ['env', 'react']
                    // }
                },
                exclude : /node_modules/
            },
            {
                test : /\.css$/,    // 只针对.css
                use  : [
                    {loader : "style-loader"}, {loader : "css-loader"}
                ]
            }
        ]
```

## CSS module
###   被称为CSS modules的技术意在把JS的模块化思想带入CSS中来，通过CSS模块，所有的类名，动画名默认都只作用于当前模块。Webpack对CSS模块化提供了非常好的支持，只需要在CSS loader中进行简单配置即可，然后就可以直接把CSS的类名传递到组件的代码中，这样做有效避免了全局污染。具体的代码如下：
```
module.exports = {
    ...
    module: {
        rules: [
            ...
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"}, 
                    {loader: 
                        "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }
                ]
            }
        ]
    }
};
```

*   我们在app文件夹下创建一个Greeter.css文件来进行一下测试
```
/* Greeter.css */
.root {
  background-color: #eee;
  padding: 10px;
  border: 3px solid #ccc;
}
```
*   导入.root到Greeter.js中
```
import React, {Component} from 'react';
import config from './config.json';
import styles from './Greeter.css';//导入

class Greeter extends Component{
  render() {
    return (
      <div className={styles.root}> //使用cssModule添加类名的方法
        {config.greetText}
      </div>
    );
  }
}

export default Greeter
```
放心使用把，相同的类名也不会造成不同组件之间的污染。

## CSS预处理器
###   Sass 和 Less 之类的预处理器是对原生CSS的拓展，它们允许你使用类似于variables, nesting, mixins, inheritance等不存在于CSS中的特性来写CSS，CSS预处理器可以这些特殊类型的语句转化为
###   浏览器可识别的CSS语句，你现在可能都已经熟悉了，在webpack里使用相关loaders进行配置就可以使用了，以下是常用的CSS 处理loaders:。
*   Less Loader
*   Sass Loader
*   Stylus Loader

#   不过其实也存在一个CSS的处理平台-PostCSS，它可以帮助你的CSS实现更多的功能，在其官方文档可了解更多相关知识。  

#   除此 本文还引用 ccs-hot-loader
```
npm install --save-dev css-hot-loader
```


###     产品阶段的构建

##  优化插件
###   webpack提供了一些在发布阶段非常有用的优化插件，它们大多来自于webpack社区，可以通过npm安装，通过以下插件可以完成产品发布阶段所需的功能
*   OccurenceOrderPlugin :为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
*   UglifyJsPlugin：压缩JS代码；
*   ExtractTextPlugin：分离CSS和JS文件
*   OccurenceOrder 和 UglifyJS plugins 都是内置插件，你需要做的只是安装其它非内置插件
```
npm install --save-dev extract-text-webpack-plugin
```

###   目前为止，我们已经使用webpack构建了一个完整的开发环境。但是在产品阶段，可能还需要对打包的文件进行额外的处理，比如说优化，压缩，缓存以及分离CSS和JS。
###   对于复杂的项目来说，需要复杂的配置，这时候分解配置文件为多个小的文件可以使得事情井井有条，以上面的例子来说，我们创建一个webpack.production.config.js的文件，在里面加上基本的配置,它和原始的webpack.config.js很像，如下：
```

```




*   本篇多参考、整理与网上各路大神的心得资料以及本人学习过程中的一些经验、各方搬迁资料... 
###   这里列出部分来源地址：
*   https://www.jianshu.com/p/ac816f8610f8
*   https://www.jianshu.com/p/42e11515c10f

###   注1 ：package.json JSON文件不支持注释，package.json中的script会安装一定顺序寻找命令对应位置，本地的node_modules/.bin路径就在这个寻找清单中，所以无论是全局还是局部安装的Webpack，你都不需要写前面那指明详细的路径了。 如多是window电脑，build 需要配置未："build" : "set NODE_ENV=production && webpack --config ./webpack.production.config.js --progress"

###   注2 ：npm一次性安装多个依赖模块，模块之间用空格隔开 例： npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react