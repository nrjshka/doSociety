import React, { Component } from 'react'



class Settings extends Component{
    constructor(props){
        super(props);

        this.state = {
            'dateChangePassword': '',
            'login': ''
        }
    }

    componentWillMount(){
        //получаем список настроек
        fetch('/api/getsettingsinfo/', {
            method: 'GET',
            headers : {
                'Authorization' : 'JWT ' + localStorage.getItem('token'),
            },
        })
        .then( (result) => {return result.json() })
        .then( (data) => {
            //only debug mod
            //console.log('dateChangePassword', data['timeSetPassword']);

            //определяем месяц
            var month = Number(data['timeSetPassword'].substr(5,2));
            //определяем день
            var day = Number(data['timeSetPassword'].substr(8));
            //определяем год
            var year = Number(data['timeSetPassword'].substr(0,4));
            //выводим дату
            var date = day + '.' +month + '.' + year;

            //only debug mod = true
            //console.log('Дата', date);
            //console.log('Данные', data);
            
            this.setState({
              'dateChangePassword': date,
              'login': data['username']
            });
        });
    }

    passwordChange(){
        //тут идет анализ паролей

        //получаем пароли
        let oldPassword = document.getElementsByName('oldpassword')[0].value;
        let fpassword = document.getElementsByName('fpassword')[0].value;
        let spassword = document.getElementsByName('spassword')[0].value;

        //debug-mod only
        //console.log('Пароли', oldPassword + '\n' + fpassword + '\n' + spassword);

        //обнуляем ответ на удачное изменения пароля(если его только что меняли)
        document.getElementById('yesPassword').style.display = 'none';

        //отправляем запрос на проверку пароля
        fetch('/api/checkuserpassword/', {
            method: 'POST',
            headers : {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
                'Authorization' : 'JWT ' + localStorage.getItem('token'),
            },
            body:JSON.stringify({
				//отправляем старый пароль
				password: oldPassword,
			}
			)
        })
        .then( (result) => { return result.json()})
        .then( (data) => {
            //получили данные
            if (data['status']){
                //если старый пароль введен верно

                //обнуляем ошибку ввода старого пароля
                document.getElementById('errorOldPassword').style.display = 'none';

                if (fpassword === spassword){
                    //если пароли одинаковые, то на всякий случай чистим ошибку
                    document.getElementById('errorNewPassword').style.display = 'none';

                    if (fpassword.length > 5){
                        //чистим ошибку
                        document.getElementById('errorLowLength').style.display = 'none';

                        //если длинна больше 5 символов
                        fetch('/api/changeuserpassword/', {
                            method: 'POST',
                            headers : {
                				'Content-Type': 'application/json',
                				'Accept': 'application/json',
                                'Authorization' : 'JWT ' + localStorage.getItem('token'),
                            },
                            body:JSON.stringify({
                				//отправляем старый пароль
                				password: fpassword,
                			}
                			)
                        })
                        .then( (result) => {return result.json()})
                        .then( (data) => {
                            //добавляем "ответ", что пароль изменен успешно
                            document.getElementById('yesPassword').style.display = 'inherit';
                        });
                    }else {
                        //если длинна меньше или равна 5 символам
                        document.getElementById('errorLowLength').style.display = 'inherit';
                    }
                }else{
                    //если пароли не одинаковые, то выводим ошибку
                    document.getElementById('errorNewPassword').style.display = 'inherit';
                }
            }
            else {
                //если старый пароль введен не верно, то выводим ошибку
                document.getElementById('errorOldPassword').style.display = 'inherit';
            }
        });
    }

    exit(){
        //выход из аккаунта
        localStorage.removeItem('token');

        window.location.href = '/';
    }

	render(){
		return(
		<div>
		  <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 content">
            <div className="contentTuning">
              <div className="contentTuning__exit"><img src="static/img/tuning/exit.png" /><a href="#" onClick={this.exit} >Выйти из аккаунта</a></div>
              <div className="contentTuning__new">
                <div className="contentTuning__infinity">&infin;</div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 contentTuning__parameter">Пароль</div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 contentTuning____value">Дата последнего изменения пароля {this.state.dateChangePassword}</div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 contentTuning__change" id="changePassword"><a href="#">Изменить</a></div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 contentTuning__cancel" id="cancelPassword"><a href="#">Отмена</a></div>
              </div>
              <div className="contentTuning__new">
                <div className="contentTuning__infinity" id="infinityPassword">&infin;</div>
                <div className="contentTuning__yes" id="yesPassword">Пароль изменен</div>
                <div className="contentTuning__novel" id="novelPassword">
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5 contentTuning__newParameter">Старый пароль</div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <input className="contentTuning__input contentTuning__newParameter" type="password" name="oldpassword" placeholder="Пароль" />
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5 contentTuning__newParameter">Новый пароль</div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <input className="contentTuning__input contentTuning__newParameter" type="password" name="fpassword" placeholder="Пароль" />
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5 newParameter contentTuning__newParameter">Повторите пароль</div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <input className="contentTuning__input contentTuning__newParameter" type="password" name="spassword" placeholder="Пароль" />
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5"> </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <div className="contentTuning__error" id="errorOldPassword">Не верно указан старый пароль</div>
                      <div className="contentTuning__error" id="errorNewPassword">Новые пароли не совпадают</div>
                      <div className="contentTuning__error" id="errorLowLength">Новый пароль должен быть длиннее 5 символов</div>
                      <button className="contentTuning__button contentTuning__newParameter" id="buttonNewPassword" onClick={this.passwordChange}>Изменить пароль</button>
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 contentTuning__parameter">Логин</div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 contentTuning____value">{this.state.login}</div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 contentTuning__change" id="changeEmail"><a href="#">Изменить</a></div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 contentTuning__cancel" id="cancelEmail"><a href="#">Отмена</a></div>
              </div>
              <div className="contentTuning__new">
                <div className="contentTuning__infinity" id="infinityEmail">&infin;</div>
                <div className="contentTuning__yes" id="yesEmail">Логин изменен</div>
                <div className="contentTuning__novel" id="novelEmail">
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5 contentTuning__newParameter">Новый логин</div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <input className="contentTuning__input contentTuning__newParameter" placeholder="Логин" />
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5"> </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <div className="contentTuning__error" id="errorEmail">Не удалось отправить код подтверждения на указанный адрес</div>
                      <button className="contentTuning__button contentTuning__newParameter" id="buttonNewEmail">Изменить логин</button>
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                </div>
                <div className="contentTuning__novel" id="novelEmailCode">
                  <div className="contentTuning__delimiter"></div>
                  <div className="contentTuning__novelReport">На ваш e-mail отправлено письмо с кодом подтверждения. Пожалуйста, введите код</div>
                  <div className="contentTuning__delimiter"></div>
                  <div className="contentTuning__novelReport">Отправить повторно через <span id="timerEmail">59</span><span>с.</span><span className="contentTuning__novelReportRepeat" id="repeatEmail"><a href="#">Отправить</a></span></div>
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5 contentTuning__newParameter">Код подтверждения</div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <input className="contentTuning__input contentTuning__newParameter" placeholder="Код" />
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5"> </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <div className="contentTuning__error" id="errorEmailCode">Не верный код подтверждения, попробуйте еще раз</div>
                      <button className="contentTuning__button contentTuning__newParameter" id="buttonNewEmail">Подтвердить</button>
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 contentTuning__parameter">Адрес страницы</div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-8 contentTuning____value">dosociety.net/id123123</div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentTuning__change" id="changeURL"><a href="#">Изменить</a></div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentTuning__cancel" id="cancelURL"><a href="#">Отмена</a></div>
              </div>
              <div className="contentTuning__new">
                <div className="contentTuning__infinity" id="infinityURL">&infin;</div>
                <div className="contentTuning__yes" id="yesURL">Адрес страницы изменён</div>
                <div className="contentTuning__novel" id="novelURL">
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5 contentTuning__newParameter">Новый адрес</div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7"><span className="contentTuning__URL">dosociety.net/</span>
                      <input className="contentTuning__input contentTuning__newParameter" placeholder="Номер страницы" />
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5"> </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <div className="contentTuning__error" id="errorURL">Данный адрес не доступен. Пожалуйста, попробуйте еще раз.</div>
                      <button className="contentTuning__button contentTuning__newParameter" id="buttonNewURL">Изменить адрес</button>
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                </div>
              </div>
              <div className="contentTuning__delete"><a href="#"><img src="static/img/tuning/delete.png" />Удалить аккаунт</a></div>
            </div>
          </div>
		</div>
		);
	}
}


export default Settings
