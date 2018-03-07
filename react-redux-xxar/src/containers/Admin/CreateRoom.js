import {connect} from 'react-redux';
import CreateRoom from '../../components/Admin/CreateRoom';
import * as adminAction from '../../actions/admin';
import {bindActionCreators} from 'redux';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => {
    return {commonActions: bindActionCreators(adminAction, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);