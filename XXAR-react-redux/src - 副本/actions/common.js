import * as actionTypes from '../constants/index';

const showMsg = (data) => {
    return {
        type: actionTypes.COMMON_SHOWMSG,
        data
    }
}

const login = (data) => {
    return {
        type: actionTypes.DOLOGIN_CONFIRM,
        data
    }
}

const confirm = ( data ) => {
    return {
        type: actionTypes.DOLOGIN_CONFIRM,
        data
    }
}

export {showMsg, login, confirm};