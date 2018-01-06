Redux + React-redux + React-Native
========================================================================================================================================
#  【Redux + React-redux React-Native】 learn

#   React Router
## 安装：
####    React Router被拆分成三个包：react-router,react-router-dom和react-router-native。react-router提供核心的路由组件与函数。其余两个则提供运行环境（即浏览器与react-native）所需的特定组件。进行网站（将会运行在浏览器环境中）构建，我们应当安装react-router-dom。react-router-dom暴露出react-router中暴露的对象与方法，因此你只需要安装并引用react-router-dom即可。

```
npm install --save react-router-dom
```

##  路由器（Router）
### 对于网页项目，存在<BrowserRouter>与<HashRouter>两种组件。当存在服务区来管理动态请求时，需要使用<BrowserRouter>组件，而<HashRouter>被用于静态网站。通常，我们更倾向选择<BrowserRouter>，但如果你的网站仅用来呈现静态文件，那么<HashRouter>将会是一个好选择。


##  历史（History）
### 每个路由器都会创建一个history对象并用其保持追踪当前location[注1]并且在有变化时对网站进行重新渲染。这个history对象保证了React Router提供的其他组件的可用性，所以其他组件必须在router内部渲染。一个React Router组件如果向父级上追溯却找不到router组件，那么这个组件将无法正常工作。
*   注：[1]
*   locations 是一个含有描述URL不同部分属性的对象：
*   // 一个基本的location对象
*   { pathname: '/', search: '', hash: '', key: 'abc123' state: {} }


## 渲染<Router>
### 路由器组件无法接受两个及以上的子元素。基于这种限制的存在，创建一个<App>组件来渲染应用其余部分是一个有效的方法（对于服务端渲染，将应用从router组件中分离也是重要的）。
```
import { BrowserRouter } from 'react-router-dom'
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
```

## <App>
### 应用通过<App>组件定义。简化一下，我们将应用拆分成两个部分。<Header>组件包含网站的导航链接。<Main>组件则呈现其余内容。
```
// this component will be rendered by our <___Router>

const App = () => {
    <div>
        <Header />
        <Main />
    </div>
}
```

##  路由（Route）
### <Route>组件是React Router中主要的结构单元。在任意位置只要匹配了URL的路径名(pathname)你就可以创建<Route>元素进行渲染。

##  路径（Path）
### <Route>接受一个数为string类型的path，该值路由匹配的路径名的类型。例如：<Route path='/roster'/>会匹配以/roster[注2]开头的路径名。在当前path参数与当前location的路径相匹配时，路由就会开始渲染React元素。若不匹配，路由不会进行任何操作[注3]。
*   注：
*   [2] 你可以渲染无路径的<Route>，其将会匹配所有location。此法用于访问存在上下文中的变量与方法。
*   [3] 如果你使用children参数，即便在当前location不匹配时route也将进行渲染。
```
<Route path='/roster'/>
// 当路径名为'/'时, path不匹配
// 当路径名为'/roster'或'/roster/2'时, path匹配
// 当你只想匹配'/roster'时，你需要使用"exact"参数
// 则路由仅匹配'/roster'而不会匹配'/roster/2'
<Route exact path='/roster'/>
```
*   #注意：在匹配路由时，React Router只关注location的路径名。当URL如下时：
*   http://www.example.com/my-projects/one?extra=false  React Router去匹配的只是'/my-projects/one'这一部分。

##  匹配路径












`分割线`
-------------------------------------------------------------------------------------------------------------------------------------------

*   使用时，路由器Router就是React的一个组件。
```
import { Router } from 'react-router';
render(<Router />, document.getElemntById('app'));
```
Router组件本身只是一个容器，通过Route组件来定义路由。
```
import { Router, Route, hashHistory } from 'react-router';

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
    </Router>
), documnet.getElementById('app'));
```
*   这段代码：定义了根路由 / (如：http://localhost:8080/)，组件会加载到 documnet.getElementById('app').另外:Router组件还有一个参数：history, 它的值 hashHistory表示路由切换由URL的hash变化决定
    即：URL的#部分变化。（访问：http://localhost:8080/ 实际看的的是：http://localhost:8080/#/）。

*   Router组件定义了URL路径与组件的对应关系。可以同时使用多个Route组件：
```
<Router history={hashHistory}>
  <Route path="/" component={App}/>
  <Route path="/repos" component={Repos}/>
  <Route path="/about" component={About}/>
</Router>
```
*   子路由也可以不写在Router组件里面，单独传入Router组件的routes属性.可以用下面的写法：
```
let routes = <Route path="/" component={App}>
                <Route path="/repos" component={Repos}/>
                <Route path="/about" component={About}/>
             </Route>;

<Router routes={routes} history={browserHistory}/>
```

### 路由嵌套
*   Route组件一样可以嵌套。  上面的代码中，访问 /repos 、/about 时会先加载App组件，然后在它的内部再加载Repos、About组件。
```
<APP>
  <Repos/>
  <About/>
</App>
```
*   所以App(父组件)要写成下面的样子：
```
exopt default React.createClass({
    render() {
        return <div>
            ...
            {this.props.children}
        </div>
    }
})
```
*   App组件的this.props.children属性就是子组件。

### path属性
*   Route组件的path属性指定路由的匹配规则。这个属性是可以省略的，这样的话，不管路径是否匹配，总是会加载指定组件。例：
```
<Route path="inbox" component={Inbox}>
    <Route path="messages/:id" component={Message} />
</Route>
```
```
<Route component={Inbox}>
    <Route path="inbox/messages/:id" component={Message} />
</Route>
```
*   上述两种皆可以；当访问/inbox/message/:id时，加载下面的组件：
```
<Inbox>
    <Message/>
</Inbox>
```

### 通配符
*   path属性可以使用通配符。
```
<Route path="/hello/:name">
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/hello(/:name)">
// 匹配 /hello
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/files/*.*">
// 匹配 /files/hello.jpg
// 匹配 /files/hello.html

<Route path="/files/*">
// 匹配 /files/ 
// 匹配 /files/a
// 匹配 /files/a/b

<Route path="/**/*.jpg">
// 匹配 /files/hello.jpg
// 匹配 /files/path/to/file.jpg
```
*   统配规则如下：
```
（1）:paramName
:paramName匹配URL的一个部分，直到遇到下一个/、?、#为止。这个路径参数可以通过this.props.params.paramName取出。
（2）()
()表示URL的这个部分是可选的。
（3）*
*匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。
（4） **
** 匹配任意字符，直到下一个/、?、#为止。匹配方式是贪婪模式。
```
####    *   path属性也可以使用相对路径（不以/开头），匹配时就会相对于父组件的路径，可以参考上一节的例子。嵌套路由如果想摆脱这个规则，可以使用绝对路由。
####    *   路由匹配规则是从上到下执行，一旦发现匹配，就不再其余的规则了。
```
<Route path="/comments" ... />
<Route path="/comments" ... />
```
*   上面代码中，路径/comments同时匹配两个规则，第二个规则不会生效。

*   设置路径参数时，需要特别小心这一点。
```
<Router>
  <Route path="/:userName/:id" component={UserPage}/>
  <Route path="/about/me" component={About}/>
</Router>
```
*   上面代码中，用户访问/about/me时，不会触发第二个路由规则，因为它会匹配/:userName/:id这个规则。因此，带参数的路径一般要写在路由规则的底部。
*   此外，URL的查询字符串/foo?bar=baz，可以用this.props.location.query.bar获取。

### IndexRoute组件

```
<Router>
  <Route path="/" component={App}>
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>
```
*   上面的代码中：访问/, 不会加载任何子组件，这时App组件的this.props.children还是undefined。因此通常采用 {this.props.children || <Home/>} 这样的写法，但是Home和Accounts、Statements
    属于同级组件，却没有写在Route中。
    IndexRoute 可以显示指定 Home 是根路由的子组件，即默认加载的子组件。（类似于index.html、inde.php）.
```
<Router>
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>
```    

