import {combineReducers} from 'redux';

import {login, showMsg} from './admin';
import {organize} from './team';

export default combineReducers({
    login,
    showMsg,
    organize,
})