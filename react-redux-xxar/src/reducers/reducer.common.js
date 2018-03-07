import * as actionTypes from '../constants/index';

const showMsg_initialSate = {
    msg: '提示消息',
    confirm: true, //false,
    display: 'none',
    affirmBut: '知道了！',
    cancelBut: '取消',
    confirmBut: '确定',
    execAction: '',
}
const showMsg = (state = showMsg_initialSate, action) => {
    switch (action.type) {
        case actionTypes.COMMON_SHOWMSG:
            return Object.assign({}, state, action.data);
            break;
        default:
            return state;
            break;    
    }
}
export {showMsg};