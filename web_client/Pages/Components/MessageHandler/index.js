import React, { Component } from 'react'

class MessageHandler extends Component{
    componentWillMount(){
      console.log(this.props.sender);
      console.log(this.props.messages);
    }

    render(){
      var messagesOut = [];
      var messages = this.props.messages;

      messages.forEach( (element) => {
        messagesOut.push(<li key={element.id}>{element.text}</li>);
      });

  		return(
        <ul className="contentDialog__content contentDialog__contentI">
            <div className="contentDialog__avatar contentDialog__avatar_margin-left">
              <a href="#"><img src={this.props.author_foto} /></a>
              <div className="avatarOnline"></div>
            </div>
            <div className="contentDialog__time">{this.props.time}</div>
            <div className="contentDialog__name_padding-left_30"><a href="#">{this.props.author}</a></div>
            {messagesOut}
        </ul>          
      );
  	}
}

export default MessageHandler;
