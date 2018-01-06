import React, {Component} from 'react';
import ReactDom from 'react-dom';

class Statements extends Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false};
    }
    componentDidMount() {
        this.props.Index = {
            action : 'Statements', 
            naem   : "this Name's Statements.component"
        }
    }    

    render() {
        return (
            <div className="contriner">
                {...this.props.name}
            </div>        
        )
    }
}
export default Statements;