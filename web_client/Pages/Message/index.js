import React, { Component } from 'react'

import Header from '../Components/Header/'
import MessageBody from '../Components/MessageBody/'
import MessageMenu from '../Components/MessageMenu/'
import Menu from '../Components/Menu'
import * as queryString from 'query-string'

class Message extends Component{
    constructor(props){
        super(props);
        //если не залогинен, то редирект на 404
        
        //only debug mod = true
        //console.log(props.location);
        
        if  (localStorage.getItem('token') == null){
            document.location.href = '/404';
        }
        document.title = "Сообщения";
    }
    
    getReceiverId(){
        return queryString.parse(this.props.location.search).to;
    }

	componentDidMount(){
		var head = document.getElementById('head');
		var script = document.createElement('script');
		script.src = "static/js/scripts.min.js";
		head.appendChild(script);
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
