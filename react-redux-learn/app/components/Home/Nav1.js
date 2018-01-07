import React, {Component} from 'react';

class Nav1 extends Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false};
    }
    // componentDidMount() {
    //     this.props.Index = {
    //         action : 'Nav1', 
    //         naem   : "this Name's热门"
    //     }
    // }    

    render() {
        console.log('Nav1 =====================')
        return (
            <div className="contriner">
               Webpack...
            </div>        
        )
    }
}
export default Nav1;