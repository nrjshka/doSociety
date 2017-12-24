import React, { Component } from 'react'


import Header from '../../Components/Header/'
import Menu from '../../Components/Menu'
import InFriendsBody from '../../Components/InFriendsBody'
import FriendsMenu from '../../Components/FriendsMenu'

class InFriends extends Component{
	constructor(props){
		super(props);

		this.state = {
			id : '',
		}
	}

	componentWillMount(){
		fetch('/api/getid/', {
        		method: 'GET',
          		headers : {
            		'Authorization' : 'JWT ' + localStorage.getItem('token'),
        		},
        	})
    	.then((response) => {
        	return response.json();
    	})
    	.then((data) => {
        	this.setState({id: data['id']});
    	});	
	}

	componentDidMount(){
		var head = document.getElementById('head');
		var script = document.createElement('script');
		script.src = "static/js/scripts.min.js";
		head.appendChild(script);
	}
	
	render(){
		return(
			<div id="index">
				<div className="buttonNavigator">&raquo;</div>
                <Header logo="static/img/logo/logo.png" search="static/img/search/search.png"/>
                <div className="container">
                    <Menu />
                    <InFriendsBody />
                    <FriendsMenu />
                </div>
			</div>
		)
	}
}

export default InFriends