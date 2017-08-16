import React, { Component } from 'react'

import Header from '../Components/Header/'
import Menu from '../Components/Menu/'
import SettingsBody from '../Components/SettingsBody/'
import SettingsMenu from '../Components/SettingsMenu/'

class Settings extends Component{
	componentWillMount(){
		if  (localStorage.getItem('token') == undefined) {
			//если человек не залогинен, то отправляем его на страницу регистрации или входа
			document.location.href = '' ;
		}
		document.title = 'Настройки';
	}

	render(){
		return(
			<div id="index">
				<div className="buttonNavigator">&raquo;</div>
      			<div className="buttonSidebar">&laquo;</div>
				<Header logo="static/img/logo/logo.png" search="static/img/search/search.png"/>
				<div className="container">
				    <div className="row">
						<Menu />
						<SettingsBody />
						<SettingsMenu />
					</div>
				</div>
			</div>
		);
	}
}


export default Settings