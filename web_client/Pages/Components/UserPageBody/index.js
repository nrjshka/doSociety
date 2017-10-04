import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UserPageBody extends Component{
	constructor(props){
		super(props);
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
		//console.log('ID', this.props.id);
	}

	componentWillMount(){
		//первоначальная версия для вывода даты
		var months = ['янваврь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

		fetch('/api/getuserinfo/',{
			method: 'POST',
			headers : {
	    		'Content-Type': 'application/json',
	    		'Accept': 'application/json',
			},
			body: JSON.stringify({
				//отправляем id-пользователя
				id:  this.state.id //window.location.pathname.substr(3)
			}
			)
		})
		.then((request) => {return request.json()})
		.then((data) => {

			//определяем месяц
			var month = Number(data['birthDate'].substr(5,2)) -1;
			//определяем день
			var day = Number(data['birthDate'].substr(8));
			//определяем год
			var year = Number(data['birthDate'].substr(0,4));
			//выводим дату
			var date = day + ' ' + months[month] + ' ' + year;

			//Меняю заголовок на имя пользователя
			document.title = data['name'] + ' ' + data['surname'];

			//заполняем данные
			this.setState({
				id: this.props.id,
				name : data['name'],
				surname : data['surname'],
				birthDate : date,
				hometown : data['hometown'],
				user_foto : data['user_foto'],
				workplace : data['workplace'],
			});
		});
	}

	componentWillReceiveProps(props){

		//debug-mod only
		//console.log('UserPageBody', 'reload №2');
		//console.log('UserPageBody', props.id);

		//первоначальная версия для вывода даты
		var months = ['янваврь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

		fetch('/api/getuserinfo/',{
			method: 'POST',
			headers : {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
				//отправляем id-пользователя
				id:  props.id //window.location.pathname.substr(3)
			}
			)
		})
		.then((request) => {return request.json()})
		.then((data) => {

			//определяем месяц
			var month = Number(data['birthDate'].substr(5,2)) -1;
			//определяем день
			var day = Number(data['birthDate'].substr(8));
			//определяем год
			var year = Number(data['birthDate'].substr(0,4));
			//выводим дату
			var date = day + ' ' + months[month] + ' ' + year;

			//Меняю заголовок на имя пользователя
			document.title = data['name'] + ' ' + data['surname'];

			//заполняем данные
			this.setState({
				id: props.id,
				name : data['name'],
				surname : data['surname'],
				birthDate : date,
				hometown : data['hometown'],
				user_foto : data['user_foto'],
				workplace : data['workplace'],
			});
		});
	}

	componentDidMount(){
		var deleteButton = document.getElementById('buttonDelFriend');
		var addButton = document.getElementById('buttonAddFriend');
		var requestButton = document.getElementById('buttonRequestFriend');
		deleteButton.onclick = this.DeleteFriend;
		addButton.onclick = this.AddFriend;
		requestButton.style.display = "none";
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

export default UserPageBody
