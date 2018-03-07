import React, {Component} from 'react';
import ShowMsgModal from '../Common/ShowMsg';
import LoadingModal from '../Common/Loading';

import line_cut_img from '../../static/imgs/svg12524x7_poster_.png';

export default class extends Component {
    constructor(props){
        super(props)
        this.state = {
            LineSpotList: this.props,
        }
    }
    setSpotList = (spotList) => spotList && spotList.length && spotList.map((ele, i) => {
        return (
            <div className='tabLine' key={ele.line_spot_id}>
                <div className="line-left">
                    {ele.name}
                </div>
                <div className="line-right">
                    <span className="line-but">通关队伍数：{ele.percent}</span>
                    <img className="line-cut" src={line_cut_img}/>
                </div>
                <div className="line-spotList">
                    <div className="">
                        <span className="spot-title">关卡内容：</span>{ele.Introduce}
                    </div>
                    <div className="">
                        <span className="spot-title">已通关队伍：</span>
                        <span className="spot-CompleteTroop">{ele.spotTroop.CompleteTroop}</span>
                    </div>
                    <div className="">
                        <span className="spot-title">未通关队伍：</span>
                        <span className="spot-unFinishTroop">{ele.spotTroop.unFinishTroop}</span>
                    </div>
                </div>
            </div>
        )
    })

    render () {
        return (
            <div className='tabList'>
                {Object.values(this.state.LineSpotList).map((ele , eleI)=>{
                    return (
                        <div key={ele.line_id}>
                            <h5>{ele.name}</h5>
                                {this.setSpotList(ele.SpotList)}  
                        </div>
                    )
                })} 
            </div>
        )
    }
}
