import {connect} from 'react-redux';
import organize from '../../components/Team/organize';
import * as teamAction from '../../actions/team'
import {bindActionCreators} from 'redux';

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => {
    return {commonActions : bindActionCreators(teamAction, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(organize);