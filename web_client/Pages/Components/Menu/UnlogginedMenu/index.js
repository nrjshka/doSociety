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
      })
    })
    .then(function(response){
      //получили ответ
      if (response['ok'] == true){
        //добавляем token в локальное хранилище
        localStorage.setItem('token', response['token']);
        //переоткрыть страницу
        document.location.href = window.location.pathname;

      }else {
        //если неправильный логин или пароль
      }
    })
    .catch(function(error){
      //отлавливаем ошибки, для debug
    })
  }

	render(){
		return(
      <div>
          <div className="col-lg-2 col-md-2 col-sm-3 hidden-xs hidden-xsNo">
            <div className="navigator">
              <form className="formLogin__top_0" method="post">
                <div>
                  <input className="formLogin__input" type="text" name="login" placeholder="Телефон или Email" />
                </div>
                <div> 
                  <input className="formLogin__input" type="password" name="password" placeholder="Пароль" />
                </div>
                <label className="formLogin__label">
                  <input type="checkbox" name="remember_me" />Запомнить меня
                </label>
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