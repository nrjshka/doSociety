import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
			friend: [],
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
	}

	getFriendInfo(Page){
		fetch('/api/getfriendsinfo',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token'),
            },
      	})
      	.then((response)=>{return response.json();})
      	.then((data) =>{
 			Page.state.friend.push(data['friend']);
     	});
	}

	deleteFriend(Page,ButtId){
		/*Удаляет пользователя из списка друзей*/
		fetch('api/deletefriend/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'JWT ' + localStorage.getItem('token'),
				},
				body:JSON.stringify({
					delFriend: ButtId
				})
		})
		.then( (result) => { return result.json()})
		.then ( (data) => {
				var blockId = '_'+ButtId;
				var FriendsBlock = document.getElementById(blockId);
				FriendsBlock.style.display = 'none'
		})
	}

	render(){
		/*{(() => {return (<div>hi</div>)})()}*/
		let Page = this;
		var illusionObject = [];
		this.getFriendInfo(Page,illusionObject);
		let illusionList = Page.state.friend.pop(); 
		var friendBlock =[]; 	

		if (illusionList !== undefined) {
			for (var i = 0; i < illusionList.length; i++) {
				var Url = '/msg?to='+illusionList[i].id;
				var IdUrl ='/id'+illusionList[i].id;
				var blockId = '_'+illusionList[i].id;
				friendBlock.push(<div key={i} id={blockId}>
									<div className="contentDialog__avatar"><img src={illusionList[i].photo}/></div>
									<Link to={IdUrl}>{illusionList[i].name} {illusionList[i].surname}</Link>
									<br />
									<Link to={Url}><button className="contentProfile__button">Написать сообщение</button></Link>
									<button className="contentProfile__button" id={illusionList[i].id} onClick={(event) => {this.deleteFriend(Page,event.target.id)}}>Удалить из друзей</button>
									<br />	
								</div>);
			}
		};

		return(
			<div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 content">
				<div className="contentTuning container-fluid">
                	<div className="row">
						{friendBlock}
                	</div>
                </div>
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