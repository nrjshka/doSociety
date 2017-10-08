import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MessageHandler extends Component{
    componentWillMount(){
      //only debug mod = true

      //console.log(this.props.sender);
      //console.log(this.props.messages);
    }

    render(){
      var messagesOut = [];
      var messages = this.props.messages;
      
      messages.forEach( (element) => {
        console.log(element.id);
        messagesOut.push(<li key={element.id}>{element.text}</li>);
      });
      
      var classMessage = 'contentDialog__content';
      
      if (localStorage.getItem('id') == this.props.sender){
        classMessage += ' contentDialog__contentYou';
      }else {
        classMessage += ' contentDialog__contentI';
      }
  		
      return(
        <ul className={classMessage}>
            <div className="contentDialog__avatar contentDialog__avatar_margin-left">
              <Link to="#"><img src={this.props.author_foto} /></Link>
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
