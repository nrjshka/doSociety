import React, { Component } from 'react'


class RegisterBody extends Component{
    componentDidMount(){
        var head = document.getElementById('head');
        var script = document.createElement('script');
        script.src = "static/js/scripts.min.js";
        head.appendChild(script);
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                  <div className="col-lg-2 col-md-2 col-sm-3 hidden-xs hidden-xsNo"></div>
                  <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 content">
                    <div className="contentProfile">
                      <div className="row">
                        <div className="col-lg-6 col-lg-push-2 col-md-12 col-sm-12 col-xs-12">
                          <div className="row">
                            <div className="col-lg-6 col-md-4 col-sm-4 col-xs-6">
                              <div className="contentRegistration__avatarCover">
                                <div className="contentProfile__avatar"><img src={this.props.vk.photo_max_orig} />
                                  <div className="contentRegistration__newFoto">Изменить фото</div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentRegistration__value">{this.props.vk.last_name}</div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4 contentRegistration__value">{this.props.vk.first_name}</div>
                            <div className="clearfix hidden-lg hidden-md hidden-sm"></div>
                            <div className="col-lg-3 col-md-3 col-sm-2 col-xs-3 contentRegistration__value">Логин</div>
                            <div className="col-lg-3 col-md-5 col-sm-6 col-xs-9 contentRegistration__value">
                              <input placeholder="Email" />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-2 col-xs-3 contentRegistration__value">Пароль</div>
                            <div className="col-lg-3 col-md-5 col-sm-6 col-xs-9 contentRegistration__value">
                              <input type="password" name="password" placeholder="Пароль" />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-2 col-xs-3 contentRegistration__value">Пароль</div>
                            <div className="col-lg-3 col-md-5 col-sm-6 col-xs-9 contentRegistration__value">
                              <input type="password" name="password" placeholder="Пароль" />
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 contentRegistration__button">
                              <button className="contentTuning__button center-block">Отмена</button>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 contentRegistration__button">
                              <button className="contentTuning__button center-block">Подтвердить</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-10 col-lg-push-2 col-md-12 col-sm-12 col-xs-12">
                          <div className="contentRegistration__error" id="errorEmail">Не удалось отправить код подтверждения на указанный адрес  </div>
                          <div className="contentTuning__novel" id="novelEmailCode">
                            <div className="contentTuning__novelReport">На ваш e-mail отправлено письмо с кодом подтверждения. Пожалуйста, введите код</div>
                            <div className="contentTuning__novelReport">Отправить повторно через <span id="timerEmail">59</span><span>с.</span><span className="contentTuning__novelReportRepeat" id="repeatEmail"><a href="#">Отправить</a></span></div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">Код подтверждения</div>
                              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <input className="contentTuning__input" placeholder="Код" />
                              </div>
                              <div className="col-xs-12 contentRegistration__value">
                                <div className="contentRegistration__error" id="errorEmailCode">Не верный код подтверждения, попробуйте еще раз</div>
                              </div>
                              <button className="center-block contentTuning__button" id="buttonNewEmail">Подтвердить      </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2 hidden-sm hidden-xs hidden-smNo"></div>
                </div>
              </div>
        );
    }
}


export default RegisterBody
