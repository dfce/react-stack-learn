import React from 'react';
import ReactDOM from 'react-dom';
// import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router';
import { Router, Route,IndexRoute, hashHistory } from 'react-router';
import App from './components/Home/Index';
import Home from './components/Home/Index';
import Accounts from './components/Home/Accounts';
import Statements from './components/Home/Statements';

const AppRoot = <Router>
                    <Route path="/" component={App}>
                        <IndexRoute component={Home}/>
                        <Route path="accounts" component={Accounts}/>
                        <Route path="statements" component={Statements}/>
                    </Route>
               </Router>

ReactDOM.render(
    AppRoot,
    document.getElementById('app')
);