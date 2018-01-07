/**
 * @desc test 1 函数式组建
 */
// import React from 'react'
// const IndexComponent = () => (
//   <div>
//     <h2>这是我的第一个函数组件</h2>
//   </div>
  
// )

/**
 * @desc test 2 Class 组建
 */
import React, {Component} from 'react';
class IndexComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title  : 'React Stack',
            name   : '这是我的第一Class写的react-router组件',
            loaded: false
        }
    }
    // ComponentWillMount
    render(){
        console.log(this.props)
        return (
          <div>
              {this.state.title}
              <span>{this.state.name}</span>
          </div>
        )
    }
}

export default IndexComponent