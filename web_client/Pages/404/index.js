import React, { Component } from 'react'

import Header from '../Components/Header/'
import NotFoundBody from '../Components/NotFoundBody/'

class NotFound extends Component {

	render(){
		return( 
			<div id="index">
				<Header logo="static/img/logo/logo.png" search="static/img/search/search.png"/>
				<NotFoundBody />
			</div>
		);
	}
}

export default NotFound