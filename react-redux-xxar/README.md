基于 Koa2 + React + Redux 【stack】 微信服务号开发
=========================================================================================================================
#   【React + Redux （stack）】

#   下载完整包：安装依赖、执行
```
npm install
npm start
```
http://localhost:3001/

#   简介

#   项目结构
```javascript
|—— app                         后端服务
|—— src                         前端源代码目录
|   |—— actions                 创建函数集
|   |—— components              UI组件集
|   |—— constants               Constant 常量
|   |   └── index.js
|   |—— containers              功能组件
|   |—— reducers                Redux reducers
|   |—— routes                 路由
|   |   └── index.js
|   |—— static                  静态资源目录
|   |   └── ...
|   |—— store                   Redux store
|   |   └── configureStore.js
|   |—— template                模板
|   |   └── index.html
|   |—— util                    工具目录
|   |   └── ...
|   |—— index.js
|   └── root.js
|—— build                       打包生成目录
|—— node_modules                依赖源
|   └── ...
|—— REANME.md
|—— .babelrc                
|—— package.json                
|—— webpack.config.js           基本配置
|—— webpack.prod.config.js      生产环境配置
└── 
```

#   开发流程
##  初始化文件
```
npm init -y
```