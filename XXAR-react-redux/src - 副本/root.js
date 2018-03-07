import React from 'react';
import {Provider} from 'react-redux';
import './static/css/main'
import Routers from './routers/index';
import configureStore from './store/configureStore';
const store = configureStore();

store.subscribe(() =>{
    // console.log(store.getState());
    // console.log(JSON.stringify(store.getState(), null, 2));
});

const Root = () => (
    <Provider store={store}>
        <Routers/>
    </Provider>
);

export default Root;