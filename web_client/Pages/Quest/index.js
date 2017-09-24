import React, { Component } from 'react'


import Header from '../Components/Header/'
import QuestBody from '../Components/QuestBody/'
import Menu from '../Components/Menu'

class Quest extends Component{
	render(){
		return(
			<div id="index">
                <div className="buttonNavigator">&raquo;</div>
                <Header logo="static/img/logo/logo.png" search="static/img/search/search.png"/>
                <div className="container">
                    <Menu />
                    <QuestBody/>
                </div>
			</div>
		);
	}
}


export default Quest