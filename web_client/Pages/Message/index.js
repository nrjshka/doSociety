import React, { Component } from 'react'

import Header from '../Components/Header/'
import MessageBody from '../Components/MessageBody/'
import MessageMenu from '../Components/MessageMenu/'
import Menu from '../Components/Menu'

class Message extends Component{
	render(){
		return(
			<div id="index">
                <div className="buttonNavigator">&raquo;</div>
                <div className="buttonSidebar">&laquo;</div>
                <Header logo="static/img/logo/logo.png" search="static/img/search/search.png"/>
                <div className="container">
                    <Menu />
                    <MessageBody />
                    <MessageMenu />
                </div>
			</div>
		);
	}
}


export default Message
