import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {vkLogin} from '../../../Redux/Actions/vk'

class IndexBody extends Component{
	sendForm(){
	    //проверяем форму и получаем токен, либо ошибку
	    var login = document.getElementsByName('login')[0].value;
	    var password = document.getElementsByName('password')[0].value;

	    //debug mod = TRUE
	    //console.log('Login - ' + login + '\nPassword - ' + password);

	    //отправляем запрос к api вместе с логином и паролем
		fetch('/api/token-auth/', {
			method: 'POST',
			headers : {
    			'Content-Type': 'application/json',
    			'Accept': 'application/json',
			},
			body: JSON.stringify({
				username: login,
				password: password,
			}
			)
		})
		.then(function(response){
			return response.json();
		})
		.then(function(data){
			//получили ответ
			//если получили токен, а не ошибку
			if (data['token']){
				//добавляем token в локальное хранилище
				localStorage.setItem('token', data['token']);
				//редиректим на страницу пользователя, временно сделал без определения
				//console.log('JWT ' + localStorage.getItem('token'));
				fetch('/api/getid/', {
					method: 'GET',
					headers : {
			    		'Authorization' : 'JWT ' + localStorage.getItem('token'),
					},
				})
				.then(function(response){
					return response.json();
				})
				.then(function(data){
					localStorage.setItem('id', data['id']);
					document.location.href = '/id' + data['id'];
				});
			}
			else {
				//тогда выводим сообщение об ошибке
				document.getElementsByClassName('formLogin__error')[0].style.display = 'inherit';
			}
		})
		.catch(function(error){
			//отлавливаем ошибки, для debug
			//если неправильный логин или пароль
		});
	}

	loginClick(event){
		if (event.keyCode == 13){
			document.getElementsByName('password')[0].focus();
		}
	}

	passwordClick(event){
		if (event.keyCode == 13){
			document.getElementsByName('commit')[0].click();
		}
	}

	render(){
		return(
	      <div className="container">
	        <div className="row">
	          <div className="col-lg-1 col-md-1 hidden-sm col-xs-1"></div>
	          <div className="col-lg-5 col-md-5 col-sm-6 col-xs-10 contentIndex">
	            <div className="contentIndex__tit_font-size_24px">doSociety для мобильных устройств</div>
	            <div className="contentIndex__tit_font-size_18px">Установите официальное мобильное приложение doSociety и Вы сможете найти близких по духу друзей, куда бы Вас не забросила жизнь.</div><img className="contentIndex__imgSmart" src="static/img/index/smart.png" />
	          </div>
	          <div className="hidden-lg hidden-md hidden-sm col-xs-1"></div>
	          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
	            <form className="formLogin center-block" method="post">
	              <div>
	                <input className="formLogin__input" type="text" name="login" onKeyDown={this.loginClick} placeholder="Телефон или Email" />
	              </div>
	              <div>
	                <input className="formLogin__input" type="password" name="password" onKeyDown={this.passwordClick} placeholder="Пароль" />
	              </div>
              	  <div className="formLogin__error">Вы ввели неверный логи или пароль. Пожалуйста, проверьте правильность написания и повторите попытку.</div>
	              <div>
	                <input className="formLogin__submit" type="button" name="commit" value="Войти" onClick={this.sendForm} /><a href="#">Забыли пароль?</a>
	              </div>
	              <div className="formLogin__socia"><a title="Войти, используя ВКонтакте" onClick={ (event)=> this.props.vkLogin()}><span className="fa fa-vk"></span><span className="formLogin__socialLink">Зарегистрироваться через ВКонтакте</span></a></div>
	            </form>
	          </div>
	        </div>
	      </div>
		);
	}
}

function mapToStateProps(state){
	return state;
}

function matchDispatchToProps(dispatch){
	return {
		vkLogin: bindActionCreators(vkLogin, dispatch), 
	};
}

export default connect(mapToStateProps, matchDispatchToProps)(IndexBody)