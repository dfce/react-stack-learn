import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import img_404 from '../../static/imgs/404.png';
export default class extends Component {
    render() {
        return (
            <div className="wrapBox">
                <img src={img_404}/>
                <span style={_Style.Desc}>抱歉，页面出错了！你访问的页面可能已经离开地球</span>
                <div style={_Style.Link}>
                    <Link to={'/'}>返回首页</Link><span> | </span><Link to={'/common/aboutus'}>关于我们</Link><span> | </span><Link to={'/admin/dologin'}>去登陆</Link>
                </div>
            </div>
        )
    }
}

const _Style = {
    Desc : {
        display : 'block',
        width : '80%',
        position : 'relative',
        left : '10%',
        padding: '10px',
        textAlign : 'center',
    },
    Link : {
        width : '80%',
        position : 'relative',
        left : '10%',
        padding: '10px',
        textAlign : 'center',
    }
}