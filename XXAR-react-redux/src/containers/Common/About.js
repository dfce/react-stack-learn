import {connect} from 'react-redux';
import About from '../../components/Common/About';

const mapStateToProps = state => state;
export default connect(mapStateToProps)(About);