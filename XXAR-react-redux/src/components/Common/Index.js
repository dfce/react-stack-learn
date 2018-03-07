import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import img_404 from '../../static/image/404.png';

export default class extends Component {
    constructor(props){
        super(props);
        console.log(props)

        this.state = {
            dispaly : false,
            showMsg : '知道了...',
        }
    }

    componentDidMount() {
    // componentWillUpdate() {
    }

    render(){
        return(
            <div style={{display:this.props.showMsg.display}}>
                {this.state.showMsg}bala、bala、bala、bala....{this.props.showMsg.msg}
                <Link to={`/index/about`}>去管理员登陆页</Link>
            </div>
        );
    }
}
