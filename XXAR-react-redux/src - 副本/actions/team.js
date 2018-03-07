import * as actionTypes from '../constants/index';


// 管理员码
const organize = (data) => {
    return {
        type : actionTypes.TEAM_ORGANIZE,
        data
    }
}
const confirmBut = (data) => {
    return {
        type: actionTypes.DOLOGIN_CONFIRM,
        data
    }
}

export {organize, confirmBut};