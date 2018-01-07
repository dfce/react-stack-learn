import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import App from '../components/Home/Index';
import Nav1 from '../components/Home/Nav1';
import Nav2  from '../components/Home/Nav2';
import Routerex  from '../components/Home/Routerex';

class Routes extends Component {
        render(){return(
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">主页</Link></li>
                        <li><Link to="/WebPack">WebPack</Link></li>
                        <li><Link to="/React-Router-Redux">React-Router、Redux</Link></li>
                        <li><Link to="/React-Router-Redux/1">React-Router</Link></li>
                    </ul>
                    <hr/>
                    <Switch>
                        <Route  exact path="/" component={App}></Route>
                        <Route path="/WebPack" component={Nav1} ></Route>
                        <Route  exact path="/React-Router-Redux" component={Nav2}></Route>
                        <Route path="/React-Router-Redux/:type" component={Routerex}></Route>
                    </Switch>
                </div>
            </Router>
        )}
}
export default Routes;