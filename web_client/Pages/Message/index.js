import React, { Component } from 'react'

import Header from '../Components/Header/'
import MessageBody from '../Components/MessageBody/'
import MessageMenu from '../Components/MessageMenu/'
import Menu from '../Components/Menu'

class Message extends Component{
    constructor(props){
        super(props);
        //если не залогинен, то редирект на 404
        if  (localStorage.getItem('token') == null){
            document.location.href = '/404';
        }
        document.title = "Сообщения";
    }
    
    getReceiverId(){
        var to = window.location.search;
        if (to.substr(1,2) == 'to')
            to = to.substr(4);
        return to 
    }

	render(){
		return(
			<div id="index">
                <div className="buttonNavigator">&raquo;</div>
                <div className="buttonSidebar">&laquo;</div>
                <Header logo="static/img/logo/logo.png" search="static/img/search/search.png"/>
                <div className="container">
                    <Menu />
                    <MessageBody to={this.getReceiverId()}/>
                    <MessageMenu />
                </div>
			</div>
		);
	}
}


export default Message
