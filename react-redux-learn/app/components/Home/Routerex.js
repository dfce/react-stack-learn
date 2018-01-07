import React, {Component} from 'react';

// class Routerex extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             type  : '...'
//         }
//     }
//     render() {
//         console.log('--------------')
//         console.log(props.match.params)
//         return(
//             <div>
//                 React-learn from :{this.state.type}
//             </div>
//         )
//     }
// }
// export default Routerex;

class Routerex extends Component {
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
        console.log(this.props.match.params)
        return (
            <div>
               Webpack...
               {/* React-learn from :{this.state.type} */}
            </div>        
        )
    }
}
export default Routerex;