/**
 * @desc 编译测试
*/
// 'use strict';
// var component = require('./component.js');
// document.body.appendChild(component());


/**
 * @desc jsx 转换测试
 */
// import React from 'react';
// import ReactDOM from 'react-dom';
// import Hello from './component.jsx';

// main();

// function main() {
//     var app = document.createElement('div');
//     app.id = 'app';
//     document.body.appendChild(app);

//     ReactDOM.render(<Hello />, document.getElementById('app'));
// }

/**
 * @desc lorders 测试
 */
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

/** @desc loaders css style */
import './static/css/main.css';
// HtmlWebpackPlugin 配置了template属性 固 不需要再手动创建 app DOM
// var app = document.createElement('div');
// app.id = 'app';
// document.body.appendChild(app);
render(<Greeter />, document.getElementById('app'));