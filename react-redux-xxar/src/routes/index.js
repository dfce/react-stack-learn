import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';


import NotFound from '../components/Common/NotFound';
import AboutUs from '../components/Common/AboutUs';
// import Index from '../components/Common/Index';

import DoLogin from '../containers/Admin/DoLogin';
import Organize from '../containers/Admin/Organize';
import CreateRoom from '../containers/Admin/CreateRoom';

const Routes = () => (
    <div className='wrapper'>
        <Router>
            <Switch>
                <Route exact path='/' component={AboutUs}/>
                <Route path='/admin/dologin' component={DoLogin}/>
                <Route path='/common/aboutus' component={AboutUs}/> 
                {/* <Route path='/common/aboutus' to='/'/>  */}
                {/* <Route path='' component={}/> */}

                <Route path='/admin/organize/:SID' component={Organize}/>
                <Route path='/admin/createRoom/:SID' component={CreateRoom}/>
                
                <Route path='/404' component={NotFound}/> 
                <Redirect from='*' to='/404'/>
                <Route />
            </Switch>
        </Router>
    </div>
);

export default Routes;