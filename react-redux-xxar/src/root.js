import React from 'react';
import {Provider} from 'react-redux';
import Routers from './routes/index';
import configureStore from './store/configureStore';
import './static/css/main';

const Store = configureStore();

// 监听Store
// Store.subscribe( () => console.log(Store.getState()));

const Root = () => (
    <Provider store={Store}>
        <Routers/>
    </Provider>
);
 export default Root;