import React, {Component} from 'react';
import img_404 from '../../static/image/404.png';
import {Link} from 'react-router-dom';
export default class extends Component {
    render() {
        return (
            <div className="notFound" style={_Style.box}>
                <img src={img_404}  style={_Style.Img}/>
                <span style={_Style.Desc}>抱歉，页面出错了！你访问的页面可能已经离开地球</span>
                <div style={_Style.Link}>
                    <Link to={'/'}>返回首页</Link> <span> | </span>
                    <Link to={'/index/about'}>关于我们</Link>
                </div>
            </div>
        )
    }
}

const _Style = {
    box : {
        position : 'static',
        margin : '0 auto',
        width : '100%',
        height : '100%',
    },
    Img : {
        // height : '20%',
        // width : '40%',
        // left : '30%',top : '20%',
        position : 'absolute',
        'margin' : '0 auto',
    },
    Desc : {
        display : 'block',
        height : '20%',
        width : '80%',
        position : 'absolute',
        left : '10%',
        top : '60%',
        textAlign : 'center',
    },
    Link : {
        height : '20%',
        width : '80%',
        position : 'absolute',
        top : '80%',
        left : '10%',
        textAlign : 'center',
    }
}