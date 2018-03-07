import React, {Component} from 'react';
import img_loading from '../../static/imgs/warning.png';

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="showMsgModal" id="show-topic-dom" ref="ShowMsgModal" style={{display: this.props.showMsg.display}}>
                <div id="topic-msg">
                    <img id="ps-img" src={img_loading}/>
                    <div id="ps-msg">{this.props.showMsg.msg}</div>
                    <div id="ps-x"></div>
                    
                    {this.props.showMsg.confirm !== true ? 
                    <div className="ps-but affirm-but" id="ps-but" onClick={()=> this.props.confirm(false)}>{this.props.showMsg.affirmBut}</div>
                    :
                    <div className="ps-but confirm-but" id="ps-but">
                        <span className="confirmBut" onClick={()=> this.props.showMsg.execAction(true)}>{this.props.showMsg.confirmBut}</span>
                        <span className="cancelBut" onClick={()=> this.props.confirm(false)}>{this.props.showMsg.cancelBut}</span>
                    </div>
                    }
                </div>
            </div>
        )
    }
}
