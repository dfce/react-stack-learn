import {connect} from 'react-redux';
import Login from '../../components/Index/Login';
import * as commonAction from '../../actions/common';
import {bindActionCreators} from 'redux';

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => {
    return  {commonActions : bindActionCreators(commonAction, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);