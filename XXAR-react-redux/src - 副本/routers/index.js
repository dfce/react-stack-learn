import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import Home from '../containers/Common/Index';
import About from '../containers/Common/About';
import Login from '../containers/Index/Login';
import Organize from '../containers/Team/Organize';
import NotFound from '../components/Common/NotFound'

const Routes = () => (
    <div className="wrapper">
        <Router>
            <Switch>
                {/* <Route path="/" exact component={Organize} />  */}
                {/* <Route path="/about" exact component={About} />   */}
                 <Route path="/team/organize/:sid" component={Organize} />   


                <Route path="/" exact component={Home} />  {/*  */}
                <Route path="/index/about" component={About} /> {/* 关于我们 */}
                <Route path="/index/login" component={Login} /> {/* 前置登陆 */}
                <Route path="/team/manage" component={Home} /> {/* 房间管理 */}
                <Route path="/team/ranklist" component={Home} /> {/* 排名 */}
                <Route path="/examine" component={Home} /> {/* 摆拍审核 */}



                <Route path='/404' component={NotFound} /> {/* NotFound */}
                <Redirect from='*' to='/404' /> {/* NotFound */}
            </Switch>
        </Router>
    </div>
);

export default Routes;