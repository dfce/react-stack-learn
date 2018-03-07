import React, {Component} from 'react';
import request from '../../util/request';

import ShowMsgModal from '../Common/ShowMsg';
import img_about2 from '../../static/imgs/about_1.png';

export default class extends Component {
    constructor(props){
        super(props);
        // console.log(props)
    }

    confirm(e) {
        if(!e) this.props.commonActions.showMsg({display: 'none'});
    }
    doLogin() {
        let loginCode = this.refs.loginCode.value;
        if (loginCode.length){
            request.post(`/ApiData/admin/CodeManager`, {code: loginCode})
            .then(resData => {
                if (resData.sid){
                    this.props.history.push({pathname : `/admin/organize/${resData.sid}`});
                }else{
                    this.props.commonActions.showMsg({msg: resData.error, display: 'block', confirm: false}); 
                }
            })
            .catch(err => {
                this.props.commonActions.showMsg({msg: '管理员码错误！', display: 'block', confirm: false}); 
            })

        }else{
            this.props.commonActions.showMsg({msg: '请输入管理员码', display: 'block', confirm: false});
        }
    }

    render () {
        return (
            <div className='wrapBox'>
                <div style={_Style.iptCode}>
                    <input ref='loginCode' style={_Style.iptCode.ipt} type="text" placeholder="请输入管理员码"/>
                </div>
                <div style={_Style.subBut} onClick={() => this.doLogin()}>提交</div>
                <img style={_Style.img1} src={img_about2} alt=""/>

                <ShowMsgModal {...this.props} confirm={this.confirm.bind(this)}/>  
            </div>
        )
    }
}

const _Style = {
    // wrapBox : {},
    iptCode : {
        position: 'absolute',
        width:'78%',border: 0,
        marginTop:'36%',
        marginLeft: '11%',
        height: '42px',
        ipt : {
            border: 0,
            width: '100%',
            height: '42px',
            outline: 'none',
            WebkitAppearance: 'none',
            boxShadow: '0px 0px 6px rgba(216,216,216,0.5)',
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            lineHeight: '30px',
            color: '#B5B5B5',
            textAlign: 'center',
            fontSize: '28px',
            fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif',
        }
    },
    subBut : {
        position: 'absolute',
        marginTop:'58%',
        marginLeft: '30%',
        width: '40%',
        height: '40px',

        borderStyle: 'solid',
        borderWidth: '3px',
        borderColor: '#282B2D',
        backgroundColor: '#FFC038',
        borderRadius: '666px',
        color: '#282B2D',
        lineHeight: '35px',
        textAlign: 'center',
        fontSize: '30px',
        fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif',
    },
    img1 : {
        dispay : 'block',
        position : 'absolute',
        height : '40%',
        bottom : '10px',
        right : '8px' ,
    }
}