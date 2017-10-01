import React, { Component } from 'react'


import Header from '../Components/Header/'
import Menu from '../Components/Menu'

class Friends extends Component{
	render(){
		return(
			<div id="index">
				<div className="buttonNavigator">&raquo;</div>
                <Header logo="static/img/logo/logo.png" search="static/img/search/search.png"/>
                <div className="container">
                    <Menu />
                </div>
			</div>
		)
	}
}

export default Friends