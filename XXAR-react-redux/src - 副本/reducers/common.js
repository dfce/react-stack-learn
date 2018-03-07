import * as actionTypes from '../constants/index';

// 管理员码登陆前置页
const organize = ( state = {aa:'aa'}, action ) => {
    switch (action.type) {
        case actionTypes.TEAM_ORGANIZE:
            return Object.assign({}, state, action.data);
            break;
        default:
            return state;
    }
};

export {organize};