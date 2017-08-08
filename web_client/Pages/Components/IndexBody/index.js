import React, { Component } from 'react'


class IndexBody extends Component{
	render(){
		return(
	      <div className="container">
	        <div className="row">
	          <div className="col-lg-1 col-md-1 hidden-sm col-xs-1"></div>
	          <div className="col-lg-5 col-md-5 col-sm-6 col-xs-10 contentIndex">
	            <div className="contentIndex__tit_font-size_24px">doSociesy для мобильных устройств</div>
	            <div className="contentIndex__tit_font-size_18px">Установите официальное мобильное приложение doSociesy и Вы сможете найти близких по духу друзей, куда бы Вас не забросила жизнь.</div><img className="contentIndex__imgSmart" src="static/img/index/smart.png" />
	          </div>
	          <div className="hidden-lg hidden-md hidden-sm col-xs-1"></div>
	          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
	            <form className="formLogin center-block" method="post">
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
	                <input className="formLogin__submit" type="submit" name="commit" value="Войти" /><a href="#">Забыли пароль?</a>
	              </div>
	              <div className="formLogin__socia"><a href="#" onclick="javascript: openid_vk()" title="Войти, используя ВКонтакте"><span class="fa fa-vk"></span><span className="formLogin__socialLink">Зарегистрироваться через ВКонтакте</span></a></div>
	            </form>
	          </div>
	        </div>
	      </div>
		);
	}
}

export default IndexBody