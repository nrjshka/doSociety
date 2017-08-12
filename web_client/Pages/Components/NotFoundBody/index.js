import React, { Component } from 'react'
import {Link} from 'react-router-dom'


class NotFoundBody extends Component{
	render(){
		return(
		   <div className="content404">
	        <div className="contentQuest">
	          <div className="contentQuest__circle">
	            <div className="contentQuest_found"></div>
	            <div className="content404__404">404</div>
	            <div className="content404__error">Страница не найдена</div><Link className="content404__link" to="/">На главную?</Link>
	            <div className="content404__smail"><img src="static/img/logo/logo_blue.png" /></div>
	            <div className="contentQuest_avatarxxxWrap">
	              <div className="contentQuest_avatarxxx" onClick="animation({}, this);"><img src="static/img/nav/1_nav.png" /></div>
	              <div className="contentQuest_avatarxxx" onClick="animation1({}, this);"><img src="static/img/nav/1_nav.png" /></div>
	              <div className="contentQuest_avatarxxx" onClick="animation2({}, this);"><img src="static/img/nav/1_nav.png" /></div>
	              <div className="contentQuest_avatarxxx" onClick="animation3({}, this);"><img src="static/img/nav/1_nav.png" /></div>
	              <div className="contentQuest_avatarxxx" onClick="animation4({}, this);"><img src="static/img/nav/1_nav.png" /></div>
	              <div className="contentQuest_avatarxxx" onClick="animation5({}, this);"><img src="static/img/nav/1_nav.png" /></div>
	              <div className="contentQuest_avatarxxx" onClick="animation6({}, this);"><img src="static/img/nav/1_nav.png" /></div>
	              <div className="contentQuest_avatarxxx" onClick="animation7({}, this);"><img src="static/img/nav/1_nav.png" /></div>
	              <div className="contentQuest_avatarxxx" onClick="animation8({}, this);"><img src="static/img/nav/1_nav.png" /></div>
	              <div className="contentQuest_avatarxxx" onClick="animation9({}, this);"><img src="static/img/nav/1_nav.png" /></div>
	              <div className="contentQuest_avatarxxx" onClick="animation10({}, this);"><img src="static/img/nav/1_nav.png" /></div>
	              <div className="contentQuest_avatarxxx" onClick="animation11({}, this);"><img src="static/img/nav/1_nav.png" /></div>
	            </div>
	          </div>
	        </div>
	      </div>
		);
	}
}

export default NotFoundBody