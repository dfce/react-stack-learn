Redux + React-redux + React-Native
========================================================================================================================================
#  【Redux + React-redux React-Native】 learn

### http://react-guide.github.io/react-router-cn/index.html 【官方中文文档地址】

#   React Router
## 安装：
####    React Router被拆分成三个包：react-router,react-router-dom和react-router-native。react-router提供核心的路由组件与函数。其余两个则提供运行环境（即浏览器与react-native）所需的特定组件。进行网站（将会运行在浏览器环境中）构建，我们应当安装react-router-dom。react-router-dom暴露出react-router中暴露的对象与方法，因此你只需要安装并引用react-router-dom即可。

```
npm install --save-dev react-router-dom
```

##  路由器（Router）
### 对于网页项目，存在<BrowserRouter>与<HashRouter>两种组件。当存在服务区来管理动态请求时，需要使用<BrowserRouter>组件，而<HashRouter>被用于静态网站。通常，我们更倾向选择<BrowserRouter>，但如果你的网站仅用来呈现静态文件，那么<HashRouter>将会是一个好选择。


##  历史（History）
### 每个路由器都会创建一个history对象并用其保持追踪当前location[注1]并且在有变化时对网站进行重新渲染。这个history对象保证了React Router提供的其他组件的可用性，所以其他组件必须在router内部渲染。一个React Router组件如果向父级上追溯却找不到router组件，那么这个组件将无法正常工作。


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

##  <Route>是如何渲染的？
当一个路由的path匹配成功后，路由用来确定渲染的参数有三种。只需要提供其中一种即可。
*   component : 一个React组建。当带有component参数的route匹配成功后，touted会返回一个新的元素其为component参数所对应的React组件
    （使用React.createElement创建）。
*   render : 一个返回React element的函数[注5].当匹配成功后调用该函数。过程与传入component参数类似，并且对于行级渲染与需要向元素传入额外参数的操作
    会更有用。
*   children : 一个返回React element的函数。与上述两个参数不同，无论route是否匹配当前location，其都会被渲染。
    ```
    <Route path='/page' component={Page} />
    const extraProps = { color: 'red' }
    <Route path='/page' render={(props) => (
    <Page {...props} data={extraProps}/>
    )}/>
    <Route path='/page' children={(props) => (
    props.match
        ? <Page {...props}/>
        : <EmptyPage {...props}/>
    )}/>
    ```
    通常component参数与render参数被更经常地使用。children参数偶尔会被使用，它更常用在path无法匹配时呈现的'空'状态。在本例中并不会有额外的状态，所以我们将使用<Route>的component参数。

    通过<Route>渲染的元素会被传入一些参数。分别是match对象，当前location对象[注6]以及history对象（由router创建）[注7]。 

## <Routes>
### 现在我们清楚了根路由的结构，我们需要实际渲染我们的路由。对于这个应用，我们将会在<Main>组件中渲染<Switch>与<Route>，这一过程会将route匹配生成的HTML放在<main>节点中。      
```
...
class Routes extends Component {
        render(){return(
            <Router>
                <div>
                    <Switch>
                        <Route  exact path="/" component={App}></Route>
                        <Route path="/WebPack" component={Nav1} ></Route>
                        <Route path="/React-Router、Redux" component={Nav2}></Route>
                    </Switch>
                </div>
            </Router>
        )}
}
...
```
*   #注意：主页路由包含额外参数。该参数用来保证路由能准确匹配path。
### 嵌套路由
React-Router路由/React-Router、Redux/:type并未包含再上述<Switch>中。它有组件负责在路径包含‘/React-Router、Redux’的情形下进行渲染。
在Router组件中，我们将为两种路径进行渲染：
*   /React-Router、Redux ：对应路劲名仅仅是/React-Router、Redux时，因此需要在元素上添加exact参数。
*   /React-Router、Redux/:type ：该路由使用一个路由参数来获取/React-Router、Redux后的路径名。
```
<Switch>
    <Route  exact path="/" component={App}></Route>
    <Route path="/WebPack" component={Nav1} ></Route>
    <Route path="/React-Router、Redux" component={Nav2}></Route>
    <Route path="/React-Router、Redux/:type" component={React-Router}></Route>
</Switch>
```
*   组合在相同组件中分享共同前缀的路由是一种有用的方法。这就需要简化父路由并且提供一个区域来渲染具有相同前缀的通用路由。
    例如，<Roster>用来渲染所有以/roster开始的全部路由。
    ```
    const Roster = () => (
    <div>
        <h2>This is a roster page!</h2>
        <Switch>
            <Route exact path='/roster' component={FullRoster}/>
            <Route path='/roster/:number' component={Player}/>
        </Switch>
    </div>
    )
    ```
##  路径参数
有时路径名中存在我们需要获取的参数。我们可以向route的路径字符串中添加path参数

如'/roster/:number'中:number这种写法意味着/roster/后的路径名将会被获取并存在match.params.number中。例如，路径名'/roster/6'会获取到一个对象：
```
{number : '6'} // 注获取的值是字符串类型的
```    

##  Link
现在，我们应用需要在各个页面切换。如果使用锚点元素实现，在每次点击是页面将被重新加载。React Router 提供了<Link>组件用来避免这种状况的发生。当你点击<Link>时，URL会更新，组件被重新渲染，但是页面不会重新加载。





*   注：
*   [1] locations 是一个含有描述URL不同部分属性的对象：
        // 一个基本的location对象
        { pathname: '/', search: '', hash: '', key: 'abc123' state: {} }
*   [2] 你可以渲染无路径的<Route>，其将会匹配所有location。此法用于访问存在上下文中的变量与方法。
*   [3] 如果你使用children参数，即便在当前location不匹配时route也将进行渲染。
*   [4] 当需要支持相对路径的<Route>与<Link>时，你需要多做一些工作。相对<Link>将会比你之前看到的更为复杂。因其使用了父级的match对象而非当前URL来匹
        配相对路径。
*   [5] 这是一个本质上无状态的函数组件。内部实现，component参数与render参数的组件是用很大的区别的。使用component参数的组件会使用        
        React.createElement来创建元素，使用render参数的组件则会调用render函数。如果我们定义一个内联函数并将其传给component参数，这将会比使用render参数慢很多。       
        ```
        <Route path='/one' component={One}/>
        // React.createElement(props.component)
        <Route path='/two' render={() => <Two />}/>
        // props.render()
        ``` 
*   [6] <Route>与<Switch>组件都会带有location参数。这能让你使用与实际location不同的location去匹配地址。
*   [7] 可以传入staticContext参数，不过这仅在服务端渲染时有用。        


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

