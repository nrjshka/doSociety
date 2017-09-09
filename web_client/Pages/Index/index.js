import React, { Component } from 'react'

import Header from '../Components/Header/'
import IndexBody from '../Components/IndexBody/'

class Index extends Component{
	constructor(props){
		if (localStorage.getItem('token') != null){
			document.location.href = '/settings';
		}
		super(props);
	}

	render(){
		return(
			<div id="index">
				<Header logo="static/img/logo/logo.png" search="static/img/search/search.png"/>
				<IndexBody />
			</div>
		);
	}
}


export default Index
