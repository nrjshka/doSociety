import React, { Component } from 'react'

class UserPageBody extends Component{
	constructor(props){
		super(props);
		this.state = {
			name : '',
			surname : '',
			birthDate : '',
			hometown : '',
			user_foto : '',
			workplace : '',
		}
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
				id: window.location.pathname.substr(3)
			}
			)
		})
		.then((request) => {return request.json()})
		.then((data) => {
			
			//определяем месяц
			var month = Number(data['birthDate'].substr(5,2)) -1;
			//определяем день
			var day = data['birthDate'].substr(8);
			//определяем год
			var year = data['birthDate'].substr(0,4);
			//выводим дату
			var date = day + ' ' + months[month] + ' ' + year;

			//заполняем данные 
			this.setState({
				name : data['name'],
				surname : data['surname'],
				birthDate : date,
				hometown : data['hometown'],
				user_foto : data['user_foto'],
				workplace : data['workplace'],
			});
		});
	}

	render(){
		
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