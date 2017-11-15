import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getUserInfo} from '../../../Redux/Actions'


class FriendsBody extends Component{
	constructor(props){
		super(props);

		this.state = {
			id: this.props.id,
			name: '',
			surname: '',
			birthDate: '',
			hometown: '',
			user_foro: '',
			workplace: '',
			listOfFriends: '',

			something: '',
		}
	}

	componentWillReceiveProps(newProps){
		if (newProps.id != this.props.id){
			newProps.getUserInfo(newProps.id);			
		}

		document.title = 'Друзья';

		this.setState({
			id: this.props.id,
			name : newProps.user.name,
			surname : newProps.user.surname,
			birthDate : '',
			hometown : newProps.user.hometown,
			user_foto : newProps.user.user_foto,
			workplace : newProps.user.workplace,
			listOfFriends : newProps.user.listOfFriends,
		});
	}

	componentWillMount(){
		document.title = 'Друзья';
		this.setState({
			id: this.props.id,
			name: this.props.user.name,
			surname: this.props.user.surname,
			birthDate: '',
			hometown : this.props.user.hometown,
			user_foto: this.props.user.user_foto,
			workplace: this.props.user.workplace,
			listOfFriends: this.props.user.listOfFriends,
		});
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
        	this.props.getUserInfo(data['id']);
    	});

		//this.props.getUserInfo(this.props.id);
	}

	creatorOfFriendsBar(Page,illusionObject){
		/*var illusionFriendBar =[];
		for (var i = 0; i < (Page.state.listOfFriends.length+1); i++) {
			fetch('/api/getuserinfo/',{
		 			method: 'POST',
			    	headers : {
			    	    'Content-Type': 'application/json',
			   		    'Accept': 'application/json',
		    	},
		    	body: JSON.stringify({
		        	id: Page.state.listOfFriends[i], 
		    	})
			})
			.then( (result) => {return result.json()})
			.then( (data) => {
					illusionObject = data.name+' '+data.surname;	
			
					Page.setState({
						something: Page.state.something+
									<div>
							
								{illusionObject}
								<button >Написать сообщение</button>				
								<button >Удалить из друзей</button>
							   
								   </div></br>,
					});
			});
		};*/
	}

	render(){
		var Page = this;
		var illusionObject = '';
		
		//if (this.state.listOfFriends.length != 0){
		//	this.creatorOfFriendsBar(Page,illusionObject);
		//}

		return(
			<div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 content">
				{this.state.something}
			</div>
		)
	}
}

function mapToStateProps(state){
	return {
		user: state.message
	};
}

function matchDispatchToProps(dispatch){
	return {
	    getUserInfo: bindActionCreators(getUserInfo, dispatch),
	};
}
export default connect(mapToStateProps, matchDispatchToProps)(FriendsBody)