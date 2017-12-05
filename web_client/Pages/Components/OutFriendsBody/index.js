import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getUserInfo} from '../../../Redux/Actions'


class OutFriendsBody extends Component{
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
			listOfOutcoming: '',
			something: '',
			outfriend: [],
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
			listOfIncoming : newProps.user.listOfOutcoming,
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
			listOfIncoming: this.props.user.listOfOutcoming,
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

	getOutFriendInfo(Page){
		fetch('/api/getoutfriendsinfo',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token'),
            },
      	})
      	.then((response)=>{return response.json();})
      	.then((data) =>{
 			Page.state.outfriend.push(data['outfriend']);
     	});
	}

	cancellationOfAdd(Page,ButtId){
		/*Отмена заявки в друзья*/
		fetch('api/cancellationofrequest/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'JWT ' + localStorage.getItem('token'),
				},
				body:JSON.stringify({
					cancelFriend: ButtId
				})
		})
		.then( (result) => { return result.json()})
		.then ( (data) => {
		})
	}

	render(){
		var Page = this;
		var illusionObject = '';
		
		this.getOutFriendInfo(Page);

		let illusionList = Page.state.outfriend.pop(); 
		var friendBlock =[];	
		if (illusionList !== undefined) {
			for (var i = 0; i < illusionList.length; i++) {
				var IdUrl ='/id'+illusionList[i].id;
				friendBlock.push(<div className="contentDialog__avatar"><img src={illusionList[i].photo}/></div>);
				friendBlock.push(<Link to={IdUrl}>{illusionList[i].name} {illusionList[i].surname}</Link>);
				friendBlock.push(<br />);
				friendBlock.push(<button className="contentProfile__button" id={illusionList[i].id} onClick={(event) => {this.cancellationOfAdd(Page,event.target.id)}}>Отменить запрос</button>);
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
export default connect(mapToStateProps, matchDispatchToProps)(OutFriendsBody)