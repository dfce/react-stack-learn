import React from 'react';
import ReactDom from 'react-dom';
import Root from './root';

ReactDom.render(
    <Root/>,
    document.getElementById('app')
);

if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept();
};