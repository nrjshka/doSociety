import React, { Component } from 'react'

import Header from '../Components/Header/'
import Menu from '../Components/Menu/'
import UserPageBody from '../Components/UserPageBody/'

class UserPage extends Component{
	render(){
		return(
			<div id="index">
				<Header logo="static/img/logo/logo.png" search="static/img/search/search.png"/>	
				<div className="container">
				    <div className="row">
						<Menu />
						<UserPageBody />
					</div>
				</div>
			</div>
			
		);
	}
}


export default UserPage