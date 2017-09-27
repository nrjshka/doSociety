import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as getMessage from '../../../Redux/Actions'

class MessageSender extends Component{
    constructor(props){
        this.props.getMessage.default(this.props.to);

    }

    componentWillReceivePropr(props){
        this.props.getMessage.default(this.props.to);
    }

    render(){
        var messageData = this.props.message.msg_data;
        var messageArray = [];

        if (messageData)
            messageData.forEach( (element) => {
                messageArray.push(<MessageHandler key={element.time} sender={element.sender} messages={element.messages} author={element.author} time={element.time} author_foto={element.author_foto} />);
        });
        
        return();
  	}
}

function messageStore(state){
  return state;
}

function matchDispatchToProps(dispatch){
  return {
    getMessage: bindActionCreators(getMessage, dispatch)
  };
}

export default connect(messageStore, matchDispatchToProps)(MessageSender);
