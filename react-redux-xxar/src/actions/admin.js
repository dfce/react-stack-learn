import * as actionTypes from '../constants/index';
import WS from '../util/ws';

const doLogin = (data) => {
    return {
        type: actionTypes.ADMIN_DOLOGIN,
        data
    }
}
const showMsg = (data) => {
    return {
        type: actionTypes.COMMON_SHOWMSG,
        data
    }
}

const roomDataList = (data) => {
    return {
        type: actionTypes.ADMIN_ROOM_DATALIST,
        data
    }
}

export {showMsg, roomDataList};