import React, { Component } from 'react'

class LogginedMenu extends Component{
	render(){
		return(
      <div className="col-lg-2 col-md-2 col-sm-3 hidden-xs hidden-xsNo">
  			 <nav className="navigator">
            <ul>
              <li><img src="static/img/nav/1_nav.png" /><a href="#">Профиль</a></li>
            </ul>
            <ul>
              <li><img src="static/img/nav/2_nav.png" /><a href="#">Личные сообщения</a></li>
            </ul>
            <ul>
              <li><img src="static/img/nav/3_nav.png" /><a href="#">Конференция</a></li>
            </ul>
            <ul>
              <li><img src="static/img/nav/4_nav.png" /><a href="#">Друзья</a></li>
            </ul>
            <ul>
              <li><img src="static/img/nav/5_nav.png" /><a href="#">Случайный собеседник</a></li>
            </ul>
            <ul>
              <li><img src="static/img/nav/6_nav.png" /><a href="#">Музыка</a></li>
            </ul>
            <ul>
              <li><img src="static/img/nav/7_nav.png" /><a href="#">Настройки</a></li>
            </ul>
          </nav>
        </div>
		);
	}
}


export default LogginedMenu