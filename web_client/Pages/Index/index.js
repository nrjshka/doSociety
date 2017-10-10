import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Header from '../Components/Header/'
import IndexBody from '../Components/IndexBody/'
import RegisterBody from '../Components/RegisterBody'

class Index extends Component{
	constructor(props){
		if (localStorage.getItem('token') != null){
			document.location.href = '/settings';
		}
		super(props);
	}

	componentDidMount(){
		var head = document.getElementById('head');
		var script = document.createElement('script');
		script.src = "static/js/scripts.min.js";
		head.appendChild(script);
	}

	componentWillReceiveProps(newProps){
	}

	render(){
		var content = <IndexBody />
		if (this.props.vk != null){
			content = <RegisterBody vk={this.props.vk} /> 
		}

		return(
			<div id="index">
				<Header logo="static/img/logo/logo.png" search="static/img/search/search.png"/>
				{content}
			</div>
		);
	}
}

function mapToStateProps(state){
	return state;
}

export default connect(mapToStateProps)(Index)
