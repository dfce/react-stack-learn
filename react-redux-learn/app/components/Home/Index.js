import React, {Component} from 'react';
import ReactDom from 'react-dom';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false};
    }
    componentDidMount() {
        this.props = {
            action : 'Index', 
            naem   : "this Name's index.component"
        }
    }    

    render() {
        return (
            <div className="contriner">
                {this.props.childredn}
            </div>        
        )
    }
}
export default Index;