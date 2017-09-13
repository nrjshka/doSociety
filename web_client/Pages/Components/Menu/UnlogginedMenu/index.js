import React, { Component } from 'react'

class UnlogginedMenu extends Component{
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
      <div>
          <div className="col-lg-2 col-md-2 col-sm-3 hidden-xs hidden-xsNo">
            <div className="navigator">
              <form className="formLogin__top_0" method="post">
                <div>
                  <input className="formLogin__input" type="text" name="login" onKeyDown={this.loginClick} placeholder="Телефон или Email" />
                </div>
                <div>
                  <input className="formLogin__input" type="password" name="password" onKeyDown={this.passwordClick} placeholder="Пароль" />
                </div>
                <div>
                  <input className="formLogin__submit" name="commit" type="button" onClick={this.sendForm} value="Войти" />
                </div>
                <div><a href="#">Забыли пароль?</a></div>
                <div className="formLogin__socia"><a href="#"title="Войти, используя ВКонтакте"><span className="fa fa-vk"></span><span className="formLogin__socialLink">Зарегистрироваться через ВКонтакте</span></a></div>
              </form>
            </div>
          </div>
      </div>
		);
	}
}


export default UnlogginedMenu
