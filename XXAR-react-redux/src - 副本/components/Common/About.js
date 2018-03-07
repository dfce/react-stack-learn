import React, {Component} from 'react';
import img_about1 from '../../static/image/about_1.jpg';
import img_about2 from '../../static/image/about_1.png';

export default class extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div style={_Style.box}>
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
    box : {
        margin : '0 auto',
        width : '100%',
        height : '100%',
    },
    head : {
        height : '20%',
        width : '80%',
        position : 'absolute',
        top : '10%',left : '10%',
        textAlign : 'center',
        
    },
    img1 : {
        dispay : 'block',
        position : 'absolute',
        width : '30%',
        bottom : '48%',
        left : '35%' ,
    },
    img2 : {
        dispay : 'block',
        position : 'absolute',
        height : '40%',
        bottom : '10px',
        right : '8px' ,
    }
}