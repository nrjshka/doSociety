import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getUserInfo} from '../../../Redux/Actions'

class UserPageBody extends Component{
	constructor(props){
		super(props);
		
		// this.props.getUserInfo(this.props.id);			
		
		this.state = {
			id: this.props.id,
			name : '',
			surname : '',
			birthDate : '',
			hometown : '',
			user_foto : '',
			workplace : '',
			listOfIncoming: [],
		}
		//debug-mod only
		//console.log('ID', this.props.id);;
	}

	componentWillReceiveProps(newProps){
		if (newProps.id != this.props.id){
			newProps.getUserInfo(newProps.id);			
		}

		//первоначальная версия для вывода даты
		var months = ['янваврь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

		//определяем месяц
		var month = Number(newProps.user.birthDate.substr(5,2)) -1;
		//определяем день
		var day = Number(newProps.user.birthDate.substr(8));
		//определяем год
		var year = Number(newProps.user.birthDate.substr(0,4));
		//выводим дату
		var date = day + ' ' + months[month] + ' ' + year;

		//Меняю заголовок на имя пользователя
		document.title = newProps.user.name + ' ' + newProps.user.surname;

		this.setState({
			id: this.props.id,
			name : newProps.user.name,
			surname : newProps.user.surname,
			birthDate : date,
			hometown : newProps.user.hometown,
			user_foto : newProps.user.user_foto,
			workplace : newProps.user.workplace,
			listOfIncoming : newProps.user.listOfIncoming,
		});
	}

	componentWillMount(){

			//первоначальная версия для вывода даты
			var months = ['янваврь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

			//определяем месяц
			var month = Number(this.props.user.birthDate.substr(5,2)) -1;
			//определяем день
			var day = Number(this.props.user.birthDate.substr(8));
			//определяем год
			var year = Number(this.props.user.birthDate.substr(0,4));
			//выводим дату
			var date = day + ' ' + months[month] + ' ' + year;

			//Меняю заголовок на имя пользователя
			document.title = this.props.user.name + ' ' + this.props.user.surname;

			this.setState({
				id: this.props.id,
				name : this.props.user.name,
				surname : this.props.user.surname,
				birthDate : date,
				hometown : this.props.user.hometown,
				user_foto : this.props.user.user_foto,
				workplace : this.props.user.workplace,
				listOfIncoming : this.props.user.listOfIncoming,
			});
		}


	componentWillMount(){
		this.props.getUserInfo(this.props.id)
	}

	checkFriendsStatus(Page){
		/*Проверка статуса в котором находятся пользователь между собой, где:
		  '0'- Просто не друзья
		  '1'- Заявка отправлена
		  '2'- Друзья 	
		*/		
		
		fetch('/api/checkfriends/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'JWT ' + localStorage.getItem('token'),
				},
				body:JSON.stringify({
					checkFriends: Page.state.id
				})
		})
		.then( (result) => { return result.json()})
		.then( (data) => {
			
			var deleteButton = document.getElementById('buttonDelFriend');
			var addButton = document.getElementById('buttonAddFriend');
			var requestButton = document.getElementById('buttonRequestFriend');

			switch(data['status']){
				case '0':
						deleteButton.style.display = 'none';
						requestButton.style.display = 'none';
						addButton.style.display = 'inherit';
					break;
				case '1':
						deleteButton.style.display = 'none';
						requestButton.style.display = 'inherit';
						addButton.style.display = 'none';
					break;
				case '2':
						deleteButton.style.display = 'inherit';
						requestButton.style.display = 'none';
						addButton.style.display = 'none';
					break;
			}
		})	
	}

	requestToFriend(Page){
		/*Отправка заявки в друзья*/
		fetch('/api/requesttofriend/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'JWT ' + localStorage.getItem('token'),
				},
				body:JSON.stringify({
					newFriend: Page.state.id
				})
		})
		.then( (result) => { return result.json()})
		.then( (data) => {
			if (data['status'] === '1'){
				//если все прошло хорошо, то меняем кнопки на UserPage
				var deleteButton = document.getElementById('buttonDelFriend');
				var addButton = document.getElementById('buttonAddFriend');
				var requestButton = document.getElementById('buttonRequestFriend');
				deleteButton.style.display = 'none';
				requestButton.style.display = 'inherit';
				addButton.style.display = 'none';
			}else if (data['status'] === '2'){
				var deleteButton = document.getElementById('buttonDelFriend');
				var addButton = document.getElementById('buttonAddFriend');
				var requestButton = document.getElementById('buttonRequestFriend');
				deleteButton.style.display = 'inherit';
				requestButton.style.display = 'none';
				addButton.style.display = 'none';
			}
		})
	}

	cancellationOfRequest(Page){
		/*Отмена заявки в друзья*/
		fetch('api/cancellationofrequest/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'JWT ' + localStorage.getItem('token'),
				},
				body:JSON.stringify({
					cancelFriend: Page.state.id
				})
		})
		.then( (result) => { return result.json()})
		.then ( (data) => {
			if (data['status'] === '0'){
				//если все прошло хорошо, то меняем кнопки на UserPage
				var deleteButton =document.getElementById('buttonDelFriend'); 
				var addButton = document.getElementById('buttonAddFriend');
				var requestButton = document.getElementById('buttonRequestFriend');
				deleteButton.style.display = 'none';
				requestButton.style.display = 'none';
				addButton.style.display = 'inherit';
			}	
		})
	}

	deleteFriend(Page){
		/*Удаляет пользователя из списка друзей*/
		fetch('api/deletefriend/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'JWT ' + localStorage.getItem('token'),
				},
				body:JSON.stringify({
					delFriend: Page.state.id
				})
		})
		.then( (result) => { return result.json()})
		.then ( (data) => {
			if (data['status'] === '0'){
				//если все прошло хорошо, то меняем кнопки на UserPage
				var deleteButton =document.getElementById('buttonDelFriend'); 
				var addButton = document.getElementById('buttonAddFriend');
				var requestButton = document.getElementById('buttonRequestFriend');
				deleteButton.style.display = 'none';
				requestButton.style.display = 'none';
				addButton.style.display = 'inherit';
			}	
		})
	}

	render(){
		var outputURl = "/msg?to=" + this.state.id; 
		var UserButton; var Page = this;

		/*for (var i = 0; i < this.state.listOfIncoming.length; i++) {
			console.log(this.state.listOfIncoming[i]);
		}*/

		this.checkFriendsStatus(Page);

  		if ((localStorage.getItem('id') != this.props.id) && (localStorage.getItem('token'))){
			UserButton = 
			<div>
				<Link to={outputURl}>
	                <button className="contentProfile__button" id="buttonMessage">Написать сообщение</button>
		        </Link>  
				<button className="contentProfile__button" id="buttonAddFriend" onClick={ (event) => {this.requestToFriend(Page)}}> Добавить в друзья</button>
				<button className="contentProfile__button" id="buttonDelFriend" onClick={(event) => {this.deleteFriend(Page)}}>Удалить из друзей</button>
	    		<button className="contentProfile__button" id="buttonRequestFriend" onClick={(event) => {this.cancellationOfRequest(Page)}}>Заявка отправлена</button>
	    	</div>	
	    }
	     
		return(
			<div>
	          <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 content">
	            <div className="contentProfile">
	              <div className="row">
	                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
	                  <div className="contentProfile__avatarCover">
	                    <div className="contentProfile__avatar"><img src={this.state.user_foto} />
	                      <div className="contentProfile__newFoto">&uarr; Обновить фото</div>
	                    </div>
	                    <div className="contentProfile__newFotoHide">&times;</div>
	                  </div>
	                  <div className="contentProfile__status">Online</div>
	                  	{UserButton}
	                </div>
	                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
	                  <div className="contentProfile__name">{this.state.name} {this.state.surname}</div>
	                  <div className="row contentProfile__info">
	                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentProfile__parameter">День рождения:</div>
	                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 contentProfile__value">{this.state.birthDate}</div>
	                  </div>
	                  <div className="row contentProfile__info">
	                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentProfile__parameter">Город:</div>
	                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 contentProfile__value">{this.state.hometown}</div>
	                  </div>
	                  <div className="row contentProfile__info">
	                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentProfile__parameter">Место работы: </div>
	                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 contentProfile__value">{this.state.workplace}</div>
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>

	          <div className="col-lg-2 col-md-2 hidden-sm hidden-xs hidden-smNo">
	            <aside className="sidebar">
	            </aside>
	          </div>
          </div>
		);
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
export default connect(mapToStateProps, matchDispatchToProps)(UserPageBody)
