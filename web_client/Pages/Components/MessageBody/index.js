import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MessageHandler from '../MessageHandler'
import {getMessageInfo, wsCreate, wsMessage, getUserInfo} from '../../../Redux/Actions'

class MessageBody extends Component{
  constructor(props){
    super(props);

    //отправляем действие на загрузку информации в Redux
    
    this.props.getMessage(this.props.to);
    this.props.getUserInfo(this.props.to);
    this.props.wsCreate();

    console.log(this.props);
    this.state = {
      id: this.props.to,
      name : '',
      surname : '',
    }
  }

  componentWillReceiveProps(nextProps){
    //отправляем действие на загрузку информации в Redux
    if (nextProps.to != this.props.to){
      nextProps.getMessage(nextProps.to);
      this.props.getUserInfo(nextProps.to);
    }
  
	  //переписать этот код, почему он лезет в message???
    this.setState({
       id : nextProps.to,
       name : nextProps.message.name,
       surname : nextProps.message.surname,
       user_foto : nextProps.message.user_foto,
    });

  }

  messageKeyListener(event){
    if ((event.keyCode == 13) && (!event.shiftKey)){
      document.getElementsByClassName('formMessage__sumbitButton')[0].click();
    }
  }

  componentDidUpdate(){
    var messageBody = document.getElementsByClassName('contentDialog__screen')[0];
    messageBody.scrollTop = messageBody.scrollHeight;
  }

	render(){
    var messageData = this.props.message.msg_data;
    var messageArray = [];
    var iterator = 0;
    if (messageData)
        messageData.forEach( (element) => {
          messageArray.push(<MessageHandler key={iterator.toString()} sender={element.sender} messages={element.messages} author={element.author} time={element.time} author_foto={element.author_foto} />);
          iterator += 1;  
        });

    var outPath = "/id" + this.props.to;
		
    return(
            <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 content">
              <div className="contentDialog">
                <div className="contentDialog__header">
                  <div className="contentDialog__avatar"><a href="#"><img src={this.state.user_foto} /></a>
                    <div className="avatarOnline"></div>
                  </div>
                  <div className="contentDialog__name_padding-left_69"><a href={outPath}>{this.state.name} {this.state.surname}</a><span className="contentDialog__navIcon"><a href="#">&bull; &bull; &bull;</a></span></div>
                  <div className="contentDialog__nav">
                    <ul>
                      <li key={1} ><img src="static/img/dialog/dialog_1.png" /><a href="#">Показать вложения</a></li>
                      <li key={2} ><img src="static/img/dialog/dialog_2.png" /><a href="#">Поиск по истории сообщений</a></li>
                      <li key={3} ><img src="static/img/dialog/dialog_3.png" /><a href="#">Отключить уведомления</a></li>
                      <li key={4} ><img src="static/img/dialog/dialog_4.png" /><a href="#">Очистить историю сообщений</a></li>
                    </ul>
                  </div>
                </div>
                <div className="contentDialog__screenWrap">
                  <div className="contentDialog__screen" >
                    {messageArray}      
                  </div>
                </div>
                <div className="contentDialog__footer">
                  <for className="formMessage">
                    <div className="formMessage__upload">
                      <input className="formMessage__uploadInput" type="file" />
                      <button className="formMessage__uploadButton" type="button" alt="Загрузить файл"><img src="static/img/dialog/dialog_1.png" /></button>
                    </div>
                    <textarea className="formMessage__textInput" onKeyUp={this.messageKeyListener} rows="1" placeholder="Напишите сообщение..."></textarea>
                    <div className="formMessage__smail"><a href="#"><img src="static/img/dialog/dialog_6.png" /></a></div>
                    <button className="formMessage__sumbitButton" 
                      onClick={ (event) => {
                          var message = document.getElementsByClassName('formMessage__textInput')[0].value;
                          // message = message.replace(/\n$/m, '');
                          if (message != ''){
                            document.getElementsByClassName('formMessage__textInput')[0].value = "";
                            this.props.wsMessage(message, this.props.to);
                        }
                      } }>
                      <img src="static/img/dialog/dialog_7.png" />
                    </button>
                  </for>
                 </div>
              </div>
            </div>
		);
	}
}

function messageStore(state){
	return state;
}

function matchDispatchToProps(dispatch){
	return {
	    getMessage: bindActionCreators(getMessageInfo, dispatch),
	    getUserInfo: bindActionCreators(getUserInfo, dispatch),
	    wsCreate: bindActionCreators(wsCreate, dispatch),
	    wsMessage: bindActionCreators(wsMessage, dispatch)  
  };
}

export default connect(messageStore, matchDispatchToProps)(MessageBody);
