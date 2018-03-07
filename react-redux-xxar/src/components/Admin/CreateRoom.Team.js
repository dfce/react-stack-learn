import React, {Component} from 'react';
// import ShowMsgModal from '../Common/ShowMsg';
import LoadingModal from '../Common/Loading';

import status_img from '../../static/imgs/svg-229219x229.svg';
import line_cut_img from '../../static/imgs/svg12524x7_poster_.png';

export default class extends Component {
    constructor(props){
        super(props)
        this.state = {
            teamList: this.props.teamList,
            actLine: this.props.actLine,
            number: this.props.number,
            isBegin: this.props.isBegin,
        }
        console.log('props:', __dirname, '---> props : ', this.props)
    }


    actLineList = (CurrLineID, TeamRoomTroopID, i) => {
        return (
            <div className="line-but-list" ref={`actLine${TeamRoomTroopID}`}>
                <span onClick={() => this.changeLine(i, undefined, TeamRoomTroopID)}>线路分配</span>
                {this.state.actLine && this.state.actLine.length > 0 && this.state.actLine.map((ele) => {
                return (<span line-data={ele.line_id} key={ele.line_id} className={CurrLineID == ele.line_id ? 'currLine active' : ''}  onClick={() => this.changeLine(i, ele.line_id, TeamRoomTroopID)}>{ele.name}</span>)
                })}
            </div>
        )
    }

    menberList = (data, TroopUid) => data && data.length && data.map((ele, index) => {
        let member_NickName = TroopUid == ele.MemberID ? `${ele.NickName}(队长)` : `${ele.NickName}` || `队员${index++}`
        return (
            <span key={index} member-data={ele.MemberID}>{member_NickName}</span>
        )
    })

    /**
     * @desc 切换列表类型
     */
    cutShowView(e, type = 'createroom') {
        // console.log(e.target)
        this.setState({viewType: type == 'createroom'})
        this.props.webSocket.send(JSON.stringify(new Object({action: `teamBuilding.${type}`, number: this.state.number})));
    }
    /**
     * @desc 组队详情
     */
    showTeamDetail(i) {
       this.refs['teamDetail'+i].style.display = this.refs['teamDetail'+i].style.display == 'block' ? 'none' : 'block';
    }
    /**
     * @desc 线路切换
     */
    showActLine(i) {
        this.refs[`actLine${i}`].style.display = this.refs[`actLine${i}`].style.display == 'block' ? 'none' : 'block';
    }
    changeLine (i, line_id, TeamRoomTroopID) {
        this.showActLine(TeamRoomTroopID)
        if (line_id !== undefined && TeamRoomTroopID){
            this.props.setChangeTroopI({changeTroopI: i})
            this.props.webSocket.send(JSON.stringify(new Object({action: 'teambuilding.changetroopline', team_room_troop_id: TeamRoomTroopID, line_id: line_id, number: this.state.number})))
        }
    }
    /**
     * @desc 取消队伍完成状态
     */
    cancelcompletetroop(troopID, i) {
        if (!this.state.isBegin){
            this.setState({cancelCompleteI: i})
            this.props.webSocket.send(JSON.stringify(new Object({action: 'teambuilding.cancelcompletetroop', number: this.state.number, team_room_troop_id: troopID})))
        }else{
            this.props.commonActions.showMsg({msg: '游戏进行中，不能进行该操作！', display: 'block', confirm: false}); 
        }
    }
    
    render () {
        return (
            <div className='tabList'>
            {this.state.teamList.map( (ele, eleI) => {
                let _memberNum =  ele.TeamRoomMembersStruct ? ele.TeamRoomMembersStruct.length : 0;
                return(
                    <div key={ele.TeamRoomTroopID} className='tabLine' ref={`tabLine${ele.TeamRoomTroopID}`} team-room-troop-data={ele.TeamRoomTroopID}>
                        <div className='line-left'>
                            {ele.status == 2 ? <img className="team-status" onClick={() => this.cancelcompletetroop(ele.TeamRoomTroopID, eleI)} src={status_img} width="26" height="27"/> : ''}
                            <div><span>{ele.TroopName}</span>(<span>{_memberNum}</span>人)</div>
                        </div>

                        <div className="line-right">
                            <span className="line-but" line-data={ele.line_id} onClick={() => this.showActLine(ele.TeamRoomTroopID)}>{ele.LineName}</span>
                            {this.actLineList(ele.line_id, ele.TeamRoomTroopID, eleI)}
                            <img className="line-cut" src={line_cut_img} onClick={() => this.showTeamDetail(ele.TeamRoomTroopID)}/>
                        </div>


                        <div className="team-detail" ref={'teamDetail'+ele.TeamRoomTroopID}>
                            <div className="team-detail-topic">
                                <span className="team-title">队名：{ele.TroopName}</span>
                                <span className="team-title team-num">人数：{_memberNum}</span>
                                <span className="team-title">线路：{ele.LineName}</span>
                            </div>
                            <div className="team-detail-memberlist">
                                <span className="team-title">成员： </span> 
                                {this.menberList(ele.TeamRoomMembersStruct, ele.TroopUid)}
                            </div>
                            <div className="team-detail-ProgressUpdate">
                                <span className="team-title">通关进度： </span> 
                                <span className="team-rate">{ele.TroopGameProgress.rate}</span>
                            </div>
                            <div className="team-detail-ProgressUpdate">
                                <span className="team-title">已通关： </span> 
                                <span className="team-CompleteSpot">{ele.TroopGameProgress.CompleteSpot} </span>
                            </div>
                            <div className="team-detail-ProgressUpdate">
                                <span className="team-title">待通关： </span> 
                                <span className="team-NotCompleteSpot">{ele.TroopGameProgress.NotCompleteSpot} </span>
                            </div>
                            <div className="team-detail-ProgressUpdate">
                                <span className="team-title" style={{color:'green'}}>出发时间： </span> 
                                <span className="team-StartTime">{ele.TroopGameProgress.StartTime} </span>
                            </div>
                            <div className="team-detail-ProgressUpdate">
                                <span className="team-title" style={{color:'red'}}>完成时间： </span> 
                                <span className="team-EndTime">{ele.TroopGameProgress.EndTime} </span>
                            </div>
                            <div className="team-detail-ProgressUpdate">
                                <span className="team-title" style={{color:'blue'}}>总用时： </span> 
                                <span className="team-totalTime">{ele.TroopGameProgress.total_time} </span>
                            </div>
                            <div className="team-detail-ProgressUpdate">
                                <span className="team-title">当前积分： </span> 
                                <span className="team-Integral">{ele.TroopGameProgress.Integral} </span>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        )
    }
}