import React, {Component} from 'react';
import 'babel-polyfill';
import ShowMsgModal from '../Common/ShowMsg';
import LoadingModal from '../Common/Loading';

import LineSpotModal from './CreateRoom.LineSpot';

import status_img from '../../static/imgs/svg-229219x229.svg';
import line_cut_img from '../../static/imgs/svg12524x7_poster_.png';

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            WS: {
                wsService: '192.168.184.235:8088/game/',
                wsSID: this.props.match.params.SID
            },
            number: '9681883',
            viewType: true, // true:showTeam, false: showLine
            teamList: false,
            actLine: false,
            lineList: false,
            isBegin: false,
            cutShowType: 1,

            timeSet: 5,
            breakRoomTips: '解散队伍',
            breakFlag: false,
            breakRoomTimeSeter: false,
            beginGameTips: '开始游戏',
            beginGameTimeSeter: false,

            // changeTroopI: false,
        }
        // console.log('this.props : ', this.props)
        // console.log('this.state : ', this.state)
    }

    // ComponentWillMount() {
    componentDidMount() {
        this.webSocket = new WebSocket(`ws://${this.state.WS.wsService}`, `gbc-auth-${this.state.WS.wsSID}`);
        this.webSocket.onopen = () => {
            let _ClientData = new Object({action: 'teamBuilding.createroom', number: this.state.number, is_run: 2});
            this.webSocket.send(JSON.stringify(_ClientData));
        }
        this.webSocket.onmessage = Event => {
            this.initalReducer(JSON.parse(Event.data) || false)
        }
        this.webSocket.onerror = Error => {
            console.log('Error:', Error)
        }
    }

    initalReducer(MsgData) {
        // console.log('MsgData : ', MsgData)
        if ( MsgData.Result ) this.viewTemp(MsgData.Result); // 处理数据结果
        if ( MsgData.code != 200 ) this.viewWarn(MsgData);   // 异常处理
        if ( MsgData.code == 200 ) this.viewSucces(MsgData); // 正常返回
    }

    viewWarn( Result ) {
        switch (Result.action) {
            case 'teambuilding.changetroopline':
            case 'teambuilding.cancelcompletetroop':
            case 'teambuilding.teamgamebegin':
                Result.code && Result.msg && this.props.commonActions.showMsg({msg: `code: ${Result.code} ;error: ${Result.msg}`, display: 'block', confirm: false})
                break;
            default:
                break;    
        }
    }
    viewSucces( Result ) {

    }
    viewTemp( Result) {
        let _Action = Result.Action || false;
        // console.log('_Action', _Action)
        switch (_Action) {
            case 'RoomInfo': // 房间信息
                this.setState({
                    teamList: Result.TeamRoomTroopStruct,
                    actLine: Result.ActivityLineStruct,
                    isBegin: Result.TeamRoomStruct.Status,
                    teamRoomID: Result.TeamRoomStruct.TeamRoomID,
                });
                // console.log('this.state', this.state)
                break;
            case 'ChangeTroopLine':     // 切换线路
                Object.assign(this.state.teamList[this.state.changeTroopI], Result.TeamRoomTroopStruct)
                this.setState({});// teamList: TeamRoomTroopStruct});
                break;
            case 'GameRoomStatic':      // 关卡、地点列表
                this.setState({
                    lineList: Result.GameSpotListStruct,
                });
                break;
            case 'AddTroop':            // 队长创队
                Result.TeamRoomTroopStruct['TeamRoomMembersStruct'] = Result.TeamRoomMembersStruct
                this.setState({teamList: [Result.TeamRoomTroopStruct].concat(this.state.teamList)});
                break;
            case 'ChangeTroopName':     // 队长修改队名
            
                break;
            case 'BreakTroop':          // 队长解散队伍
            
                break;
            case 'UserJoinTroop':       // 队员入队
                this.state.teamList.map((ele, eleI) => {
                    if (ele.TeamRoomTroopID == Result.TeamRoomMembersStruct.TeamRoomTroopID){
                        this.state.teamList[eleI].TeamRoomMembersStruct = [Result.TeamRoomMembersStruct].concat(this.state.teamList[eleI].TeamRoomMembersStruct)
                        this.setState({})
                    }
                })
                break;
            case 'UserExitTroop':       // 队员退出
                 this.state.teamList.map((troop, troopI) => {
                    if (troop.TeamRoomTroopID == Result.TeamRoomMembersStruct.TeamRoomTroopID){
                        this.state.teamList[troopI].TeamRoomMembersStruct.map((member, memberI) => {
                            if (member.TeamRoomMemberID == Result.TeamRoomMembersStruct.TeamRoomMemberID){
                                this.state.teamList[troopI].TeamRoomMembersStruct.splice(memberI, 1)
                                this.setState({})
                            }
                        })
                    }
                })
                break;
            case 'TroopStatusChange':   // 【管理员】修改组队状态
                Object.assign(this.state.teamList[this.state.cancelCompleteI], Result.TeamRoomTroopStruct)
                this.setState({}); // teamList: TeamRoomTroopStruct});
                break;  
            case 'CompleteTroop':       // 组队完成
            
                break;
            case 'GameStart':           // 开始游戏
                this.setState({isBegin: Result.TeamRoomStruct.Status});
                break;
            case 'CompleteSpotEvent':   // 游戏通关
            
                break;
            case 'GameStop':            // 结束游戏
            
                break;                              
            default:
                break;    
        }
    }


    /**
     * @desc 切换列表类型
     */
    cutShowView(e, type = 'createroom') {
        // console.log(e.target)
        this.setState({viewType: type == 'createroom'})
        this.webSocket.send(JSON.stringify(new Object({action: `teamBuilding.${type}`, number: this.state.number, is_run: 2})));
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
        if (this.state.isBegin !== 2){
            this.refs[`actLine${i}`].style.display = this.refs[`actLine${i}`].style.display == 'block' ? 'none' : 'block';
        }else{
            this.props.commonActions.showMsg({msg: '游戏进行中，不能进行该操作！', display: 'block', confirm: false});
        }

    }
    changeLine (i, line_id, TeamRoomTroopID) {
        this.showActLine(TeamRoomTroopID)
        if (line_id !== undefined && TeamRoomTroopID){
            this.setState({changeTroopI: i})
            this.webSocket.send(JSON.stringify(new Object({action: 'teambuilding.changetroopline', team_room_troop_id: TeamRoomTroopID, line_id: line_id, number: this.state.number})))
        }
    }
    /**
     * @desc 取消队伍完成状态
     */
    cancelcompletetroop(troopID, i) {
        if (this.state.isBegin !== 2){
            this.setState({cancelCompleteI: i})
            this.webSocket.send(JSON.stringify(new Object({action: 'teambuilding.cancelcompletetroop', number: this.state.number, team_room_troop_id: troopID})))
        }else{
            this.props.commonActions.showMsg({msg: '游戏进行中，不能进行该操作！', display: 'block', confirm: false}); 
        }
    }

    /**
     * @desc 解散房间
     */
    breakTeam() {
        !this.state.breakFlag ? this.props.commonActions.showMsg({msg: '确定是否要解散队伍！', display: 'block', execAction: this._breakTeam.bind(this)}) : this._breakTeam(true); 
    }
    _breakTeam(res) {
        if (!res) return false;
        this._initialSetIntval({
            flgKey: 'breakFlag', flgVal: false, 
            timesetKye: 'breakRoomTimeSeter', timesetVal: '', timerKey: 'breakTeam',
            tipsKey: 'breakRoomTips', tipsValFalse: '解散队伍', tipsValTrue: '取消解散', 
            sendData: new Object({"action":'teambuilding.breakroom',"number": this.state.number,'team_room_id': this.state.teamRoomID})
        })
    }

    /**
     * @desc 开始游戏
     */
    beginGame() {
        !this.state.beginFlag ? this.props.commonActions.showMsg({msg: '确定是否要开始游戏！', display: 'block', execAction: this._beginGame.bind(this)}) : this._beginGame(true);  
    }
    _beginGame(res) {
        if (!res) return false;
        this._initialSetIntval({
            flgKey: 'beginFlag', flgVal: false, 
            timesetKye: 'beginGameTimeSeter', timesetVal: '', timerKey: 'beginGame',
            tipsKey: 'beginGameTips', tipsValFalse: '开始游戏', tipsValTrue: '取消开始', 
            sendData: new Object({"action":'teambuilding.teamgamebegin',"number": this.state.number,'team_room_id': this.state.teamRoomID})
        })
    }


    /**
     * @desc 公共计时器处理
     */
    _initialSetIntval(params){
        this.props.commonActions.showMsg({display: 'none'});

        let initialRestoreSet = {}
        initialRestoreSet[params.flgKey] = params.flgVal;
        initialRestoreSet[params.tipsKey] = params.tipsValFalse;
        initialRestoreSet[params.timesetKye] = params.timesetVal;

        if (!this.state[params.flgKey]){
            if (!this.state.teamRoomID) {
                this.props.commonActions.showMsg({msg: '参数错误！', display: 'block', confirm: false}); 
                return false;
            }
            this.state[params.flgKey] = true;
            this.state[params.timesetKye] = this.state.timeSet
            this.state[params.timerKey] = setInterval(()=>{
                if ( this.state[params.timesetKye] > 1 ) {
                    this.state[params.tipsKey] = params.tipsValTrue;
                    this.state[params.timesetKye]--;
                    this.setState({});
                }else{
                    this.setState(initialRestoreSet);
                    clearInterval(this.state[params.timerKey]);
                    this.webSocket.send(JSON.stringify(params.sendData));
                }
            }, 1000)
            this.state[params.tipsKey] = params.tipsValTrue;
        }else{
            this.setState(initialRestoreSet);
            clearInterval(this.state[params.timerKey])
        }
    }

    /**
     * @desc Msg show
     * @param {*} e 
     */
    confirm(e) {
        if(!e) this.props.commonActions.showMsg({display: 'none'});
    }

    /**
     * @desc setTeamList
     * @return {ReactDom}
     */
    setTeamList = (teamList) => {
        return (
            <div className='tabList'>
                {teamList && teamList.map((ele, eleI) =>{
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

    actLineList = (CurrLineID, TeamRoomTroopID, i) => {
        return (
            <div className="line-but-list" ref={`actLine${TeamRoomTroopID}`}>
                <span onClick={() => this.changeLine(i, undefined, TeamRoomTroopID)}>线路分配</span>
                {this.state.actLine && this.state.actLine.length > 0 && this.state.actLine.map((ele) => {
                return (<span line-data={ele.line_id} key={ele.line_id} className={CurrLineID == ele.line_id ? 'currLine active' : ''}  onClick={() => this.changeLine(i, ele.line_id, TeamRoomTroopID)}>{ele.name}</span>)
                })}
            </div>
        )
    };

    menberList = (data, TroopUid) => data && data.length && data.map((ele, index) => {
        let member_NickName = TroopUid == ele.MemberID ? `${ele.NickName}(队长)` : `${ele.NickName}` || `队员${index++}`
        return (
            <span key={index} member-data={ele.MemberID}>{member_NickName}、</span>
        )
    })
    render () {

        return (

            <div className='wrapBox'>
                {/* 菜单切换 */}
                <div className='header-nav'>
                    <div className={`showTeam ${this.state.viewType ? 'active' : ''}`} onClick={(e) => this.cutShowView(e, 'createroom')}>队伍</div>
                    <div className={`showLine ${!this.state.viewType ? 'active' : ''}`} onClick={(e) => this.cutShowView(e, 'getroomspotlist')}>地点</div>
                </div>

                {/* 数据展示列表 */}
                <div className='showView'>
                    {this.state.viewType ? 
                        (this.state.teamList ? this.setTeamList(this.state.teamList) : <LoadingModal/>)
                    : 
                        (this.state.lineList ? <LineSpotModal {...this.state.lineList}/> : <LoadingModal/>)
                    }
                </div>

                {/* 操作菜单选项 */}
                <div className='MenbBut'>
                    {this.state.isBegin && this.state.isBegin == 2 ? 
                    <div className='InGame'>
                        <div className="btn btn-end" onClick={() => this._initialSetIntval()}>结束游戏</div> 
                        <div className="btn btn-manage" onClick={() => this}>管理</div>
                        <div className="btn btn-examine" onClick={() => this}>审核</div> 
                    </div>
                    : 
                    <div className='beforeGame'>
                        <div className="btn btn-break" onClick={() => this.breakTeam()}>{this.state.breakRoomTips + (this.state.breakRoomTimeSeter ? parseInt(this.state.breakRoomTimeSeter) : '')}</div> 
                        <div className="btn btn-begin" onClick={() => this.beginGame()}>{this.state.beginGameTips + (this.state.beginGameTimeSeter ? parseInt(this.state.beginGameTimeSeter) : '')}</div>
                    </div>
                    }
                </div>

                <ShowMsgModal {...this.props} confirm={this.confirm.bind(this)}/>
            </div>
        )
    }
}