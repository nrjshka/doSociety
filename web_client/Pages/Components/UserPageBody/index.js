import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getUserInfo} from '../../../Redux/Actions'

class UserPageBody extends Component{
	constructor(props){
		super(props);
		
		this.props.getUserInfo(this.props.id);			
		
		this.state = {
			id: this.props.id,
			name : '',
			surname : '',
			birthDate : '',
			hometown : '',
			user_foto : '',
			workplace : '',
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
			});
		}


	componentWillMount(){
		this.props.getUserInfo(this.props.id)
	}

	componentDidMount(){
		var deleteButton = document.getElementById('buttonDelFriend');
		var addButton = document.getElementById('buttonAddFriend');
		var requestButton = document.getElementById('buttonRequestFriend');
		if (deleteButton){	
			deleteButton.onclick = this.DeleteFriend;
			addButton.onclick = this.AddFriend;
			requestButton.style.display = "none";
		}
	}

	AddFriend(event){
		var deleteButton = document.getElementById('buttonDelFriend');
		var addButton = document.getElementById('buttonAddFriend');
		deleteButton.style.display = 'inherit';
		addButton.style.display = 'none';
	}

	DeleteFriend(event){ 
		var deleteButton =document.getElementById('buttonDelFriend'); 
		var addButton = document.getElementById('buttonAddFriend');
		deleteButton.style.display = 'none';
		addButton.style.display = 'inherit'; 
	}

	render(){
		var outputURl = "/msg?to=" + this.state.id; 
		
		var UserButton;
  		if (localStorage.getItem('id') != this.props.id){
			UserButton = 
			<div>
				<Link to={outputURl}>
	                <button className="contentProfile__button" id="buttonMessage">Написать сообщение</button>
		        </Link>  
				<button className="contentProfile__button" id="buttonAddFriend">Добавить в друзья</button>
				<button className="contentProfile__button" id="buttonDelFriend">Удалить из друзей</button>
	    		<button className="contentProfile__button" id="buttonRequestFriend">Заявка отправлена</button>
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
