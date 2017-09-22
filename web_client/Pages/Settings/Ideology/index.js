import React, { Component } from 'react'

import Header from '../../Components/Header/'
import Menu from '../../Components/Menu'
import IdeologyBody from '../../Components/IdeologyBody/'
import SettingsMenu from '../../Components/SettingsMenu/'

class Ideology extends Component{

	render(){
		return(
			<div id="index">
				<div className="buttonNavigator">&raquo;</div>
                <div className="buttonSidebar">&laquo;</div>
				<Header logo="static/img/logo/logo.png" search="static/img/search/search.png"/>
				<div className="container">
					<div className="row">
						<Menu />
						<IdeologyBody />
						<SettingsMenu />
					</div>
				</div>
			</div>
		);
	}
}

export default Ideology
