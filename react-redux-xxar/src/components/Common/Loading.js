import React, {Component} from 'react';
import load_img from '../../static/imgs/loadingbig.gif';

export default class extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div><img src={load_img}/></div>
        )
    }
}