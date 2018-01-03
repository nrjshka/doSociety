import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserInfo, wsGetStatus } from '../../../Redux/Actions'

class UserPageBody extends Component {
	constructor(props) {
		super(props);
		this.props.wsGetStatus(this.props.id);

		//this.props.getUserInfo(this.props.id);			

		this.state = {
			id: this.props.id,
			name: '',
			surname: '',
			birthDate: '',
			hometown: '',
			user_foto: '',
			workplace: '',
			showBirthDate: '',
			listOfIncoming: [],
			maritalstatus: '',
			politicalBeliefs: '',
			citations: '',
			arrays: [],
		}

		//debug-mod only
		//console.log('ID', this.props.id);;
	}

	componentWillReceiveProps(newProps) {
		if (newProps.id != this.props.id) {
			newProps.getUserInfo(newProps.id);
		}

		//первоначальная версия для вывода даты
		var months = ['янваврь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

		switch (newProps.user.showBirthDate) {
			case '0':
				var month = Number(newProps.user.birthDate.substr(5, 2)) - 1;
				var day = Number(newProps.user.birthDate.substr(8));
				var year = Number(newProps.user.birthDate.substr(0, 4));
				var date = day + ' ' + months[month] + ' ' + year;
				break;
			case '1':
				var month = Number(newProps.user.birthDate.substr(5, 2)) - 1;
				var day = Number(newProps.user.birthDate.substr(8));
				var date = day + ' ' + months[month];
				break;
			case '2':
				var date = 'Скрыт';

				break;
		}

		//Меняю заголовок на имя пользователя
		document.title = newProps.user.name + ' ' + newProps.user.surname;

		this.setState({
			id: this.props.id,
			name: newProps.user.name,
			surname: newProps.user.surname,
			birthDate: date,
			hometown: newProps.user.hometown,
			user_foto: newProps.user.user_foto,
			workplace: newProps.user.workplace,
			listOfIncoming: newProps.user.listOfIncoming,
			maritalstatus: newProps.user.maritalstatus,
			politicalBeliefs: newProps.user.politicalBeliefs,
			citations: newProps.user.citations,
			status: status,
		});
	}

	componentWillMount() {
		var months = ['янваврь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

		switch (this.props.user.showBirthDate) {
			case '0':
				var month = Number(this.props.user.birthDate.substr(5, 2)) - 1;
				var day = Number(this.props.user.birthDate.substr(8));
				var year = Number(this.props.user.birthDate.substr(0, 4));
				var date = day + ' ' + months[month] + ' ' + year;
				break;
			case '1':
				var month = Number(this.props.user.birthDate.substr(5, 2)) - 1;
				var day = Number(this.props.user.birthDate.substr(8));
				var date = day + ' ' + months[month];
				break;
			case '2':
				var date = 'Скрыт';

				break;
		}

		//Меняю заголовок на имя пользователя
		document.title = this.props.user.name + ' ' + this.props.user.surname;

		this.setState({
			id: this.props.id,
			name: this.props.user.name,
			surname: this.props.user.surname,
			birthDate: date,
			hometown: this.props.user.hometown,
			user_foto: this.props.user.user_foto,
			workplace: this.props.user.workplace,
		});

		this.props.getUserInfo(this.props.id)
	}

	checkFriendsStatus(Page) {
		/*Проверка статуса в котором находятся пользователь между собой, где:
		  '0'- Просто не друзья
		  '1'- Заявка отправлена со стороны owner'a
		  '2'- Друзья 
		  '3'- Заявка отправлена со стороны sub'a	
		*/

		fetch('/api/checkfriends/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'JWT ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({
				checkFriends: Page.state.id
			})
		})
			.then((result) => { return result.json() })
			.then((data) => {

				var deleteButton = document.getElementById('buttonDelFriend');
				var addButton = document.getElementById('buttonAddFriend');
				var requestButton = document.getElementById('buttonRequestFriend');
				var cansellButton = document.getElementById('buttonCancellRequest');
				var acceptButton = document.getElementById('buttonAcceptRequest');

				switch (data['status']) {
					case '0':
						deleteButton.style.display = 'none';
						requestButton.style.display = 'none';
						acceptButton.style.display = 'none';
						cansellButton.style.display = 'none';
						addButton.style.display = 'inherit';
						break;
					case '1':
						deleteButton.style.display = 'none';
						acceptButton.style.display = 'none';
						cansellButton.style.display = 'none';
						requestButton.style.display = 'inherit';
						addButton.style.display = 'none';
						break;
					case '2':
						deleteButton.style.display = 'inherit';
						requestButton.style.display = 'none';
						addButton.style.display = 'none';
						acceptButton.style.display = 'none';
						cansellButton.style.display = 'none';
						break;
					case '3':
						deleteButton.style.display = 'none';
						requestButton.style.display = 'none';
						addButton.style.display = 'none';
						acceptButton.style.display = 'inherit';
						cansellButton.style.display = 'inherit';
						break;
				}
			})
	}

	requestToFriend(Page) {
		/*Отправка заявки в друзья*/
		fetch('/api/requesttofriend/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'JWT ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({
				newFriend: Page.state.id
			})
		})
			.then((result) => { return result.json() })
			.then((data) => {

				var deleteButton = document.getElementById('buttonDelFriend');
				var addButton = document.getElementById('buttonAddFriend');
				var requestButton = document.getElementById('buttonRequestFriend');
				var cansellButton = document.getElementById('buttonCancellRequest');
				var acceptButton = document.getElementById('buttonAcceptRequest');


				if (data['status'] === '1') {
					//если все прошло хорошо, то меняем кнопки на UserPage
					deleteButton.style.display = 'none';
					requestButton.style.display = 'inherit';
					addButton.style.display = 'none';
					acceptButton.style.display = 'none';
					cansellButton.style.display = 'none';
				} else if (data['status'] === '2') {
					deleteButton.style.display = 'inherit';
					requestButton.style.display = 'none';
					addButton.style.display = 'none';
					acceptButton.style.display = 'none';
					cansellButton.style.display = 'none';
				}
			})
	}

	cancellationOfRequest(Page) {
		/*Отмена заявки в друзья*/
		fetch('api/cancellationofrequest/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'JWT ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({
				cancelFriend: Page.state.id
			})
		})
			.then((result) => { return result.json() })
			.then((data) => {
				if (data['status'] === '0') {
					//если все прошло хорошо, то меняем кнопки на UserPage
					var deleteButton = document.getElementById('buttonDelFriend');
					var addButton = document.getElementById('buttonAddFriend');
					var requestButton = document.getElementById('buttonRequestFriend');
					var cansellButton = document.getElementById('buttonCancellRequest');
					var acceptButton = document.getElementById('buttonAcceptRequest');

					deleteButton.style.display = 'none';
					requestButton.style.display = 'none';
					addButton.style.display = 'inherit';
					acceptButton.style.display = 'none';
					cansellButton.style.display = 'none';
				}
			})
	}

	deleteFriend(Page) {
		/*Удаляет пользователя из списка друзей*/
		fetch('api/deletefriend/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'JWT ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({
				delFriend: Page.state.id
			})
		})
			.then((result) => { return result.json() })
			.then((data) => {
				if (data['status'] === '0') {
					//если все прошло хорошо, то меняем кнопки на UserPage
					var deleteButton = document.getElementById('buttonDelFriend');
					var addButton = document.getElementById('buttonAddFriend');
					var requestButton = document.getElementById('buttonRequestFriend');
					var cansellButton = document.getElementById('buttonCancellRequest');
					var acceptButton = document.getElementById('buttonAcceptRequest');

					deleteButton.style.display = 'none';
					requestButton.style.display = 'none';
					addButton.style.display = 'inherit';
					acceptButton.style.display = 'none';
					cansellButton.style.display = 'none';
				}
			})
	}

	acceptingRequest(Page) {
		fetch('/api/addfriend/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'JWT ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({
				addFriend: Page.state.id
			})
		})
			.then((result) => { return result.json() })
			.then((data) => {
				if (data['status'] === '2') {
					//если все прошло хорошо, то меняем кнопки на UserPage
					var deleteButton = document.getElementById('buttonDelFriend');
					var addButton = document.getElementById('buttonAddFriend');
					var requestButton = document.getElementById('buttonRequestFriend');
					var cansellButton = document.getElementById('buttonCancellRequest');
					var acceptButton = document.getElementById('buttonAcceptRequest');

					deleteButton.style.display = 'inherit';
					requestButton.style.display = 'none';
					addButton.style.display = 'none';
					acceptButton.style.display = 'none';
					cansellButton.style.display = 'none';
				}
			})
	}

	cancellatingOfRequest(Page) {
		/*Отмена заявки в друзья*/
		fetch('api/cancellationofadding/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'JWT ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({
				cancelAdd: Page.state.id
			})
		})
			.then((result) => { return result.json() })
			.then((data) => {
				if (data['status'] === '0') {
					//если все прошло хорошо, то меняем кнопки на UserPage
					var deleteButton = document.getElementById('buttonDelFriend');
					var addButton = document.getElementById('buttonAddFriend');
					var requestButton = document.getElementById('buttonRequestFriend');
					var cansellButton = document.getElementById('buttonCancellRequest');
					var acceptButton = document.getElementById('buttonAcceptRequest');

					deleteButton.style.display = 'none';
					requestButton.style.display = 'none';
					addButton.style.display = 'inherit';
					acceptButton.style.display = 'none';
					cansellButton.style.display = 'none';
				}
			})
	}

	showExtraInfo() {
		var Info = document.getElementById('extraInfo');
		var showButt = document.getElementById('buttonShowInfo');
		var hideButt = document.getElementById('buttonHiseInfo');

		Info.style.display = 'inherit'
		showButt.style.display = 'none'
		hideButt.style.display = 'inherit'
	}

	hideExtraInfo() {
		var Info = document.getElementById('extraInfo');
		var showButt = document.getElementById('buttonShowInfo');
		var hideButt = document.getElementById('buttonHiseInfo');

		Info.style.display = 'none'
		showButt.style.display = 'inherit'
		hideButt.style.display = 'none'
	}

	showQuoteInfo(Page) {
		fetch('/api/showallcitation', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'JWT ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({
				showquote: Page.state.id,
			})
<<<<<<< HEAD
		})
			.then((response) => { return response.json(); })
			.then((data) => {
				Page.state.arrays.pop();
				Page.state.arrays.push(data['citations']);
			});
=======
        })
        .then((response)=>{return response.json();})
        .then((data) =>{
        	for (var i = 0; i < data['citations'].length; i++) {
        		Page.state.arrays.push(<div key = {i}>{data['citations'][i]}</div>)
        	}
        });	
>>>>>>> dab8275581d2948d63f12c226891ede7896876e1
	}

	render() {
		console.log(this.props);
		var outputURl = "/msg?to=" + this.state.id;
		var UserButton; var Page = this;

		var arrayStatusValue = ['Не указано', 'Не замужем/не женат', 'Замужем/женат',
			'Встречаюсь', 'Гражданский брак', 'Всё сложно',
			'Всё просто', 'В активном поиске'];

		var arrayPoliticalValue = ['Не выбраны', 'Индифферентные', 'Коммунистические',
			'Социалистические', 'Умеренные', 'Либеральные', 'Консервативные',
			'Ультраконсервативные', 'Либертарианские', 'Другие'];

<<<<<<< HEAD
		var arrayCitation = [];

		this.showQuoteInfo(Page);
		let quoteTexT = Page.state.arrays.pop();

		if (quoteTexT != undefined) {
			for (var i = 0; i < this.state.citations.length; i++) {
				arrayCitation.push(
					<div key={i}>{quoteTexT[i]}</div>
				);
			}
		}

		this.checkFriendsStatus(Page);

		if ((localStorage.getItem('id') != this.props.id) && (localStorage.getItem('token'))) {
			UserButton =
				<div>
					<Link to={outputURl}>
						<button className="contentProfile__button" id="buttonMessage">Написать сообщение</button>
					</Link>
					<button className="contentProfile__button" id="buttonAddFriend" onClick={(event) => { this.requestToFriend(Page) }}> Добавить в друзья</button>
					<button className="contentProfile__button" id="buttonDelFriend" onClick={(event) => { this.deleteFriend(Page) }}>Удалить из друзей</button>
					<button className="contentProfile__button" id="buttonRequestFriend" onClick={(event) => { this.cancellationOfRequest(Page) }}>Заявка отправлена</button>
					<button className="contentProfile__button" id="buttonAcceptRequest" onClick={(event) => { this.acceptingRequest(Page) }}>Принять заявку</button>
					<button className="contentProfile__button" id="buttonCancellRequest" onClick={(event) => { this.cancellatingOfRequest(Page) }}>Не принимать заявку</button>
				</div>
		}


		let status = "";
		if (this.props.users != null) {
			if (this.props.users['status']) {
				status = "Online";
			} else {
				status = "Offline";
			}
		}

		return (
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
								<div className="contentProfile__status">{status}</div>
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
								<div className="row contentProfile__info">
									<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentProfile__parameter">Семейное положение: </div>
									<div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 contentProfile__value">{arrayStatusValue[this.state.maritalstatus]}</div>
								</div>
								<div id="extraInfo" style={{ 'display': 'none' }}>
									<div className="row contentProfile__info">
										<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentProfile__parameter">Политические убеждения: </div>
										<div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 contentProfile__value">{arrayPoliticalValue[this.state.politicalBeliefs]}</div>
									</div>
									<div className="row contentProfile__info">
										<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentProfile__parameter">Любимые цитаты: </div>
										<div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 contentProfile__value">{arrayCitation}</div>
									</div>
								</div>
								<div>
									<button className="contentProfile__button" style={{ 'display': 'inherit', 'marginLeft': '20%' }} id="buttonShowInfo" onClick={(event) => { this.showExtraInfo() }}>SHOW</button>
									<button className="contentProfile__button" style={{ 'display': 'none', 'marginLeft': '20%' }} id="buttonHiseInfo" onClick={(event) => { this.hideExtraInfo() }}>HIDE</button>
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
=======
		var arrayCitation=[]; var CitationBlock = ''; var WorkplaceBlock = '';

		this.showQuoteInfo(Page);

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
	    		<button className="contentProfile__button" id="buttonAcceptRequest" onClick={(event) => {this.acceptingRequest(Page)}}>Принять заявку</button>
				<button className="contentProfile__button" id="buttonCancellRequest" onClick={(event) => {this.cancellatingOfRequest(Page)}}>Не принимать заявку</button>
	    	</div>	
	    }

	    if (this.state.citations.length != 0) {
	    	CitationBlock = 
	    		<div className="row contentProfile__info">
	               	<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentProfile__parameter">Любимые цитаты: </div>
	                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 contentProfile__value">{Page.state.arrays}</div>
	            </div>
	    } else {
	    	CitationBlock = <div></div>
	    }

	    if (this.state.workplace != 'None' || this.state.workplace != '') {
	    	WorkplaceBlock =
	        	<div className="row contentProfile__info">
	            	<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentProfile__parameter">Место работы: </div>
	                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 contentProfile__value">{this.state.workplace}</div>
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
	                  {WorkplaceBlock}
	                  <div className="row contentProfile__info">
	                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentProfile__parameter">Семейное положение: </div>
	                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 contentProfile__value">{arrayStatusValue[this.state.maritalstatus]}</div>
	                  </div>
	                  <div id="extraInfo" style={{'display': 'none'}}>
	                  	<div className="row contentProfile__info">
	                    	<div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentProfile__parameter">Политические убеждения: </div>
	                    	<div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 contentProfile__value">{arrayPoliticalValue[this.state.politicalBeliefs]}</div>
	                  	</div>
	                  	{CitationBlock}
	                  </div>
	                	<div>
	                		<button className="contentProfile__button" style={{'display': 'inherit','marginLeft': '20%'}} id="buttonShowInfo" onClick={(event)=>{this.showExtraInfo()}}>SHOW</button>
	    					<button className="contentProfile__button" style={{'display': 'none','marginLeft': '20%'}} id="buttonHiseInfo" onClick={(event)=>{this.hideExtraInfo()}}>HIDE</button>
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
>>>>>>> dab8275581d2948d63f12c226891ede7896876e1
		);
	}
}
function mapToStateProps(state) {
	return {
		user: state.message,
		users: state.doSociety,
	};
}

function matchDispatchToProps(dispatch) {
	return {
		getUserInfo: bindActionCreators(getUserInfo, dispatch),
		wsGetStatus: bindActionCreators(wsGetStatus, dispatch),
	};
}
export default connect(mapToStateProps, matchDispatchToProps)(UserPageBody)
