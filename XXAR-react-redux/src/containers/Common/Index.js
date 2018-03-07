import {connect} from 'react-redux';
import Index from '../../components/Common/Index';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(Index);