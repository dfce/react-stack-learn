/**
 * @desc react的代码
 */
// import React from 'react';
// import ReactDOM, {render} from 'react-dom'; 
// import IndexComponnet from './components/Home/Index';

// ReactDOM.render(
//     <IndexComponnet/>,
//     document.getElementById('app')
// );


/**
 * @desc React-Router
 */
import React from 'react';
import ReactDOM, {render} from 'react-dom'; 
import Routes from './routes/index'

render(<Routes/>, document.getElementById('app'))