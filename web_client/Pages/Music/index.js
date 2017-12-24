import React, { Component } from 'react'


import Header from '../Components/Header/'
import MusicBody from '../Components/MusicBody/'
import Menu from '../Components/Menu'

class Music extends Component{
	render(){
		return(
			<div id="index">
                <div className="buttonNavigator">&raquo;</div>
                <Header logo="static/img/logo/logo.png" search="static/img/search/search.png"/>
                <div className="container">
                    <Menu />
                    <MusicBody/>
                </div>
			</div>
		);
	}
}


export default Music