import React, { Component } from 'react'

import Header from '../Components/Header/'
import Menu from '../Components/Menu/'
import UserPageBody from '../Components/UserPageBody/'

class UserPage extends Component{
	constructor(props){
		super(props);

		//debug-mod only
		//console.log("ID", props.match.params.id);
		this.state = {
			id : props.match.params.id,
		}
	}

	componentWillReceiveProps(props){
		this.setState({id: props.match.params.id});
		//debug-mod only
		//console.log('UserPage', props.match.params.id);
	}

	render(){
		return(
			<div id="index">
				<div className="buttonNavigator">&raquo;</div>
				<Header logo="static/img/logo/logo.png" search="static/img/search/search.png"/>
				<div className="container">
				    <div className="row">
						<Menu />
						<UserPageBody id={this.state.id} />
					</div>
				</div>
			</div>

		);
	}
}


export default UserPage
