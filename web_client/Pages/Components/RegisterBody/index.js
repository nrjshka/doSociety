import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {dsRegistration} from '../../../Redux/Actions/dosociety'


class RegisterBody extends Component{
    componentDidMount(){
        var head = document.getElementById('head');
        var script = document.createElement('script');
        script.src = "static/js/scripts.min.js";
        head.appendChild(script);
    }

    componentWillMount(){
        this.setState({
          first_name: this.props.vk.first_name,
          last_name: this.props.vk.last_name,
        })
    }

    exitEvent(event){
      document.location.href = '/';
    }

    checkPassword(){
    	var password_one = document.getElementById('password').value;
    	var password_two = document.getElementById('spassword').value;

    	return password_one == password_two;
    }

    render(){
        console.log(this.props.vk);
        return(
            <div className="container">
                <div className="row">
                  <div className="col-lg-2 col-md-2 col-sm-3 hidden-xs hidden-xsNo"></div>
                  <div className="col-lg-8 col-md-8 col-sm-9 col-xs-12 content">
                    <div className="contentProfile">
                      <div className="row">
                        <div className="col-lg-6 col-lg-push-2 col-md-12 col-sm-12 col-xs-12">
                          <div className="row">
                            <div className="col-lg-6 col-md-4 col-sm-4 col-xs-5">
                              <div className="contentRegistration__avatarCover">
                                <div className="contentProfile__avatar"><img src={this.props.vk.photo_max_orig} />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4">
                              <div className="contentRegistration__value" id="surname">{this.state.first_name}</div>
                              <div className="contentRegistration__value" id="newSurname">
                                <input placeholder="Введите имя" name="fname" />
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-5 col-sm-5 col-xs-2 contentRegistration__change"><a id="changeSurname" href="#">Изменить</a><a id="saveSurname" href="#" onClick={
                              () => {
                                this.setState(Object.assign({}, this.state, {first_name: document.getElementsByName('fname')[0].value}));
                                var outDiv = document.getElementById('surname');
                                outDiv.innerHTML = document.getElementsByName('fname')[0].value;  
                              }
                            }></a></div>
                            <div className="col-lg-6 col-md-8 col-sm-8 col-xs-7"></div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4">
                              <div className="contentRegistration__value" id="lname">{this.state.last_name}</div>
                              <div className="contentRegistration__value" id="newName">
                                <input placeholder="Введите фамилию" name="sname" />
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-5 col-sm-5 col-xs-2 contentRegistration__change"><a id="changeName" href="#" >Изменить</a><a id="saveName" href="#" onClick={
                              (event) => {
                                this.setState(Object.assign({}, this.state, {second_name: document.getElementsByName('sname')[0].value}));
                                var outDiv = document.getElementById('lname');
                                outDiv.innerHTML = document.getElementsByName('sname')[0].value;
                              }
                            }></a></div>
                            <div className="col-lg-6 col-md-8 col-sm-8 col-xs-7"></div>
                            <div className="clearfix hidden-lg hidden-md hidden-sm"></div>
                            <div className="col-lg-3 col-md-3 col-sm-2 col-sm-push-0 col-xs-2 col-xs-push-3 contentRegistration__value contentRegistration__value_left_0">Логин</div>
                            <div className="col-lg-3 col-md-5 col-sm-6 col-sm-push-0 col-xs-7 col-xs-push-3 contentRegistration__value contentRegistration__value_left_0">
                              <input id="email" placeholder="Email" />
                            </div>
                            <div className="clearfix hidden-lg hidden-md hidden-sm"></div>
                            <div className="col-lg-3 col-md-3 col-sm-2 col-sm-push-0 col-xs-2 col-xs-push-3 contentRegistration__value contentRegistration__value_left_0">Пароль</div>
                            <div className="col-lg-3 col-md-5 col-sm-6 col-sm-push-0 col-xs-7 col-xs-push-3 contentRegistration__value contentRegistration__value_left_0">
                              <input type="password" id="password" name="password" placeholder="Пароль" />
                            </div>
                            <div className="col-lg-3 col-md-5 col-sm-6 col-xs-9 col-lg-push-3 col-md-push-3 col-sm-push-2 col-xs-7 col-xs-push-5 contentRegistration__value contentRegistration__value_left_16">
                              <input type="password" id="spassword" placeholder="Повторите пароль" />
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 contentRegistration__button text-right">
                              <button className="contentTuning__button" onClick={this.exitEvent}>Отмена</button>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 contentRegistration__button text-left">
                              <button className="contentTuning__button" onClick = { 
                              	(event) => {
                                    var outputArray = this.props.vk;
                                    var login = document.getElementById('email').value;
                                    var password = document.getElementById('password').value;
                                    var fname = document.getElementsByName('fname')[0].value || this.props.vk.first_name;
                                    var sname = document.getElementsByName('sname')[0].value || this.props.vk.last_name;
                                    alert(this.props.vk.user_id);
                                    if (this.checkPassword()){
                                		document.getElementById('errorNewPassword').style.display = 'none';
                                    	this.props.dsRegistration(Object.assign({},outputArray, {login: login, password: password, first_name: fname, last_name: sname }));
                                	}else {
                                		document.getElementById('errorNewPassword').style.display = 'inherit';
                                	}
                                }
                              }>Подтвердить</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-10 col-lg-push-2 col-md-12 col-sm-12 col-xs-12">
                          <div className="contentRegistration__error" id="errorNewPassword">Указанные пароли не совпадают. Пожалуйста, повторите попытку.</div>
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
                              <button className="center-block contentTuning__button" id="buttonNewEmail">Подтвердить</button>
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

function mapToStateProps(state){
    return state;
}

function matchDispatchToProps(dispatch){
    return {
        dsRegistration: bindActionCreators(dsRegistration, dispatch), 
    };
}

export default connect(mapToStateProps, matchDispatchToProps)(RegisterBody)
