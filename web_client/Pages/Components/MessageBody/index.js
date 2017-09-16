import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MessageHandler from '../MessageHandler'

class MessageBody extends Component{
	render(){
    var messageData = this.props.message.msg_data;
    var messageArray = [];

    messageData.forEach( (element) => {
      messageArray.push(<MessageHandler sender={element.sender} messages={element.messages} author={element.author} time={element.time}/>);
    });

		return(
            <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 content">
              <div className="contentDialog">
                <div className="contentDialog__header">
                  <div className="contentDialog__avatar"><a href="#"><img src="static/img/nav/1_nav.png" /></a>
                    <div className="avatarOnline"></div>
                  </div>
                  <div className="contentDialog__name_padding-left_69"><a href="#">Михаил Зобнинский</a><span className="contentDialog__navIcon"><a href="#">&bull; &bull; &bull;</a></span></div>
                  <div className="contentDialog__nav">
                    <ul>
                      <li><img src="static/img/dialog/dialog_1.png" /><a href="#">Показать вложения</a></li>
                      <li><img src="static/img/dialog/dialog_2.png" /><a href="#">Поиск по истории сообщений</a></li>
                      <li><img src="static/img/dialog/dialog_3.png" /><a href="#">Отключить уведомления</a></li>
                      <li><img src="static/img/dialog/dialog_4.png" /><a href="#">Очистить историю сообщений</a></li>
                    </ul>
                  </div>
                </div>
                <div className="contentDialog__screenWrap">
                  <div className="contentDialog__screen">
                    {messageArray}               
                  </div>
                </div>
                <div className="contentDialog__footer">
                  <form className="formMessage" action="" method="get">
                    <div className="formMessage__upload">
                      <input className="formMessage__uploadInput" type="file" />
                      <button className="formMessage__uploadButton" type="button" alt="Загрузить файл"><img src="static/img/dialog/dialog_1.png" /></button>
                    </div>
                    <textarea className="formMessage__textInput" onkeydown="textAreaHeight(this)" rows="1" placeholder="Напишите сообщение..."></textarea>
                    <div className="formMessage__smail"><a href="#"><img src="static/img/dialog/dialog_6.png" /></a></div>
                    <button className="formMessage__sumbitButton" type="submit" alt="Отправить сообщение"><img src="static/img/dialog/dialog_7.png" /></button>
                  </form>
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
	return bindActionCreators({select: '3'}, dispatch);
}

export default connect(messageStore, matchDispatchToProps)(MessageBody);
