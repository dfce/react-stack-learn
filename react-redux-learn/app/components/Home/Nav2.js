import React, {Component} from 'react';

class Nav2 extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {loaded: false};
    // }
    // componentDidMount() {
    //     this.props.Index = {
    //         action : 'Nav1', 
    //         naem   : "this Name's Nav1.component"
    //     }
    // }    

    render() {
        console.log('-----------------')
        console.log(this.props.match.params)
        return (
            <div className="contriner">
                React-Router + Redux ...
            </div>        
        )
    }
}
export default Nav2;