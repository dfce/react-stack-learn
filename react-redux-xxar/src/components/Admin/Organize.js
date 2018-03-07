import React, {Component} from 'react';
import img_logo from '../../static/imgs/96.png';

export default class extends Component {
    constructor(props){
        super(props);
        // console.log(props)
    }

    showMenu() {
        this.refs.MenuBox.style.display = (this.refs.MenuBox.style.display == 'none' ? 'block' : 'none');
    }
    domain( locationDomain ) {
        // console.log(`${locationDomain}/${this.props.match.params.SID}`)
        this.props.history.push({pathname : `${locationDomain}/${this.props.match.params.SID}`});
    }

    render () {
        return (
            <div className='wrapBox'>
                <div style={_Style.LogoBox}>
                    <img style={_Style.LogoImg} src={img_logo} alt=""/>
                </div> 
                <div style={_Style.CoachPs}>
                    <h3>教练使用注意事项：</h3>
                    <span style={_Style.CoachPs.span}>1. 点击菜单可选择您想要的操作；</span>
                    <span style={_Style.CoachPs.span}>2. 选择【菜单】—【创建房间】您可以管理本次的团建活动，您可以分配路线、在线审核、实时查看各队通关经度；</span>
                    <span style={_Style.CoachPs.span}>3. 选择【菜单】—【查看成绩】您可以查看本次活动的成绩记录，该成绩将为您保留24小时</span>
                </div>

                <div ref="SubBut" style={_Style.SubBut} onClick={() => this.showMenu()}>菜单</div>
                <div ref="MenuBox" style={_Style.MenuBox}>
                    <span style={_Style.MenuBox.span} onClick={() => this.domain('/admin/createRoom')}>创建房间</span>
                    <span style={_Style.MenuBox.span} onClick={() => this.domain('/toRanking')}>查看成绩</span>
                    <span style={_Style.MenuBox.span} onClick={() => this.domain('/common/aboutus')}>关于我们</span>
                </div>
            </div>
        )
    }
}


const _Style = {
    Row : {
        position: 'relative',
        margin:'0 auto',
        width:'100%',
        height:'100%',
        display:'block',
        clear: 'both',
    },
    LogoBox : {
        position: 'absolute',
        width: '36%',
        marginTop : '20%',
        marginLeft : '32%'
    },
    LogoImg : {
        position : 'absolute',
        width:'100%',
    },
    CoachPs : {
        position: 'absolute', 
        marginTop: '62%',
        width: '86%',
        marginLeft: '7%',
        span : {
            display:'block',
            margin:'3px',
            padding: '3px',
        }
    },
    SubBut : {
        position: 'fixed',
        bottom: '3px',
        height: '52px',
        borderStyle: 'solid',
        borderWidth: '3px',
        width: '100%',
        borderColor: '#282B2D',
        backgroundColor: '#FFC038',
        color: '#282B2D',
        lineHeight: '36px',
        textAlign: 'center',
        fontSize: '30px',
        fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif',
        padding: '7px',
        left : '0px'
    },
    MenuBox : {
        display: 'none',
        border: '1px solid #282B2D', 
        position: 'fixed',
        bottom: '58px',right:'5px',
        height: '95px',
        maxHeight : '95px',
        overflow : 'scroll',
        width: '45%',
        textAlign: 'center',
        lineHeight: '45px',
        span : {
            display: 'block',
            border: '1px solid #282B2D',
            marginBottom: '3px',
            height: '45px',
            borderStyle: 'solid',
            borderColor: '#282B2D',
            backgroundColor: '#FFC038',
            color: '#282B2D',
        }
    }
}