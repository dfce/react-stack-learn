import React, {Component} from 'react';
import img_about1 from '../../static/imgs/about_1.jpg';
import img_about2 from '../../static/imgs/about_1.png';

export default class extends Component {
    render () {
        return (
            <div className='wrapBox'>
                <div style={_Style.head}>
                    <div><h1>联系我们</h1></div>
                    <div>请联系微信：passer825</div>
                    <div>或扫描下方二维码</div>
                </div>
                <img style={_Style.img1} src={img_about1} />
                <img style={_Style.img2} src={img_about2} />
            </div>
        )
    }
}

const _Style = {
    head : {
        height : '20%',
        width : '80%',
        position : 'relative',
        marginTop : '12%',left : '10%',
        textAlign : 'center',
        
    },
    img1 : {
        dispay : 'block',
        position : 'relative',
        width : '30%',
        maxHeight: '30%',
        maxWidth: '100px',
        marginTop: '15%',
    },
    img2 : {
        dispay : 'block',
        position : 'relative',
        maxHeight : '40%',
        marginTop: '15%',
        marginLeft: '50%',
        maxWidth: '50%',
    }
}