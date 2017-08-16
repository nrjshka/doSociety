import React, { Component } from 'react'



class Settings extends Component{
	render(){
		return(
		<div>
		  <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 content">
            <div className="contentTuning">
              <div className="contentTuning__exit"><a href="#">Выйти из аккаунта</a></div>
              <div className="contentTuning__new"> 
                <div className="contentTuning__infinity">&infin;</div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 contentTuning__parameter">Пароль</div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 contentTuning____value">Изменен 4 месяца назад</div>
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
                      <input className="contentTuning__input contentTuning__newParameter" type="password" name="password" value="" placeholder="Пароль" />
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5 contentTuning__newParameter">Новый пароль</div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <input className="contentTuning__input contentTuning__newParameter" type="password" name="password" value="" placeholder="Пароль" />
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5 newParameter contentTuning__newParameter">Повторите пароль</div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <input className="contentTuning__input contentTuning__newParameter" type="password" name="password" value="" placeholder="Пароль" />
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5"> </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <div className="contentTuning__error" id="errorOldPassword">Не верно указан старый пароль</div>
                      <div className="contentTuning__error" id="errorNewPassword">Новые пароли не совпадают</div>
                      <button className="contentTuning__button contentTuning__newParameter" id="buttonNewPassword">Изменить пароль</button>
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 contentTuning__parameter">Электронная почта</div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 contentTuning____value">mail@gmail.com</div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 contentTuning__change" id="changeEmail"><a href="#">Изменить</a></div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 contentTuning__cancel" id="cancelEmail"><a href="#">Отмена</a></div>
              </div>
              <div className="contentTuning__new"> 
                <div className="contentTuning__infinity" id="infinityEmail">&infin;</div>
                <div className="contentTuning__yes" id="yesEmail">E-mail изменен</div>
                <div className="contentTuning__novel" id="novelEmail">
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5 contentTuning__newParameter">Новый e-mail</div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <input className="contentTuning__input contentTuning__newParameter" placeholder="Email" />
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5"> </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <div className="contentTuning__error" id="errorEmail">Не удалось отправить код подтверждения на указанный адрес</div>
                      <button className="contentTuning__button contentTuning__newParameter" id="buttonNewEmail">Изменить e-mail</button>
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 contentTuning__parameter">Телефон</div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 contentTuning____value">+7(926)000-00-00</div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 contentTuning__change" id="changePhone"><a href="#">Изменить</a></div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 contentTuning__cancel" id="cancelPhone"><a href="#">Отмена</a></div>
              </div>
              <div className="contentTuning__new"> 
                <div className="contentTuning__infinity" id="infinityPhone">&infin;</div>
                <div className="contentTuning__yes" id="yesPhone">Телефон изменен</div>
                <div className="contentTuning__novel" id="novelPhone">
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5 contentTuning__newParameter">Новый телефон</div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <input className="contentTuning__input contentTuning__newParameter" placeholder="Телефон" />
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-5"> </div>
                    <div className="col-lg-9 col-md-9 col-sm-8 col-xs-7">
                      <div className="contentTuning__error" id="errorPhone">Не удалось отправить код подтверждения на указанный номер</div>
                      <button className="contentTuning__button contentTuning__newParameter" id="buttonNewPhone">Изменить телефон</button>
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                </div>
                <div className="contentTuning__novel" id="novelPhoneCode">
                  <div className="contentTuning__delimiter"></div>
                  <div className="contentTuning__novelReport">Вам отправлено СМС с кодом подтверждения. Пожалуйста, введите код</div>
                  <div className="contentTuning__delimiter"></div>
                  <div className="contentTuning__novelReport">Отправить повторно через <span id="timerPhone">59</span><span>с.</span><span className="contentTuning__novelReportRepeat" id="repeatPhone"><a href="#">Отправить</a></span></div>
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
                      <div className="contentTuning__error" id="errorPhoneCode">Не верный код подтверждения, попробуйте еще раз</div>
                      <button className="contentTuning__button contentTuning__newParameter" id="buttonNewPhone">Подтвердить</button>
                    </div>
                  </div>
                  <div className="contentTuning__delimiter"></div>
                </div>
              </div>
              <div className="contentTuning__delete"><a href="#">Удалить аккаунт</a></div>
            </div>
          </div>
		</div>
		);
	}
}


export default Settings