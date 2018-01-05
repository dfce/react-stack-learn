import React, {Component} from 'react'
// import config from './config.json';
const config = {
   greetText : "Hi there and greetings from JSON。。。"
}

class Greeter extends Component{
  render() {
    return (
      <div>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter