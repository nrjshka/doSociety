import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getUserInfo} from '../../../Redux/Actions'


class InFriendsBody extends Component{
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
			listOfIncoming: '',
			something: '',
			infriend: [],
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
			listOfIncoming : newProps.user.listOfIncoming,
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
			listOfIncoming: this.props.user.listOfIncoming,
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

	acceptingRequest(Page,ButtId){
		fetch('/api/addfriend/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'JWT ' + localStorage.getItem('token'),
				},
				body:JSON.stringify({
					addFriend: Page.state.listOfIncoming[0],
				})
		})
		.then( (result) => { return result.json()})
		.then( (data) => {
			/*Можно вставить анимацию исчезновения подписчика из списка заявок*/
			if (data['status'] ==='2'){
				--Page.state.listOfIncoming.length 
			}
		})
	}

	cancellationOfRequest(Page,ButtId){
		/*Отмена заявки в друзья*/
		fetch('api/cancellationofadding/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'JWT ' + localStorage.getItem('token'),
				},
				body:JSON.stringify({
					cancelFriend: Page.state.listOfIncoming[0],
				})
		})
		.then( (result) => { return result.json()})
		.then ( (data) => {
			/*Больше анимации*/
			if (data['status'] === '0'){
				--Page.state.listOfIncoming.length
			}	
		})
	}

	getInFriendInfo(Page){
		fetch('/api/getinfriendsinfo',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token'),
            },
      	})
      	.then((response)=>{return response.json();})
      	.then((data) =>{
 			Page.state.infriend.push(data['infriend']);
     	});
	}

	render(){
		var Page = this;
		var illusionObject = '';
		
		this.getInFriendInfo(Page);

		let illusionList = Page.state.infriend.pop(); 
		var friendBlock =[];	
		if (illusionList !== undefined) {
			for (var i = 0; i < illusionList.length; i++) {
				friendBlock.push(<div className="contentDialog__avatar"><img src={illusionList[i].photo}/></div>);
				friendBlock.push(<div>{illusionList[i].name} {illusionList[i].surname}</div>);
				friendBlock.push(<br />);
				friendBlock.push(<button className="contentProfile__button" id={illusionList[i].id} onClick={(event) => {this.acceptingRequest(Page,event.target.id)}}>Принять заявку</button>);
				friendBlock.push(<button className="contentProfile__button" id={illusionList[i].id} onClick={(event) => {this.cancellationOfRequest(Page,event.target.id)}}>Не принимать заявку</button>);
				friendBlock.push(<br />);
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
export default connect(mapToStateProps, matchDispatchToProps)(InFriendsBody)