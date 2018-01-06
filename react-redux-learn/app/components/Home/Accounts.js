import React, {Component} from 'react';
import ReactDom from 'react-dom';

class Accounts extends Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false};
    }
    componentDidMount() {
        this.props.Index = {
            action : 'Accounts', 
            naem   : "this Name's Accounts.component"
        }
    }    

    render() {
        return (
            <div className="contriner">
                {...this.props}
            </div>        
        )
    }
}
export default Accounts;