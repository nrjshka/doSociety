import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MessageMenu extends Component{
	render(){
		return(
            <div className="col-lg-2 col-md-2 hidden-sm hidden-xs hidden-smNo">
              <aside className="sidebar">
                <form className="formSearchDialog" action="" method="get">
                  <input className="formSearchDialog__input" name="s" placeholder="Поиск..." type="search" required="" />
                  <button className="formSearchDialog__button" type="submit"><img src="static/img/search/search.png" /></button>
                  <button className="formSearchDialog__buttonAdd">&#10010;</button>
                </form>
                <nav className="sidebar__dialogChoice">
        				<ul>
        				  <li>
        					<div className="sidebar__dialogChoice__avatar"><a href="#"><img src="static/img/nav/1_nav.png" /></a>
        					  <div className="avatarOnline"></div>
        					</div>
        					<div className="sidebar__dialogChoice__name"><Link to="?to=1">Максим Королев</Link></div>
        				  </li>
        				</ul>
                  <ul>
                    <li>
                      <div className="sidebar__dialogChoice__avatar"><a href="#"><img src="static/img/nav/1_nav.png" /></a></div>
                      <div className="sidebar__dialogChoice__name"><a href="#">Ксения Боголюбская</a></div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <div className="sidebar__dialogChoice__avatar"><a href="#"><img src="static/img/nav/1_nav.png" /></a>
                        <div className="avatarOnline"></div>
                      </div>
                      <div className="sidebar__dialogChoice__name"><a href="#">Варвара Иванова</a></div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <div className="sidebar__dialogChoice__avatar"><a href="#"><img src="static/img/nav/1_nav.png" /></a></div>
                      <div className="sidebar__dialogChoice__name"><a href="#">Вася Пупкин</a></div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <div className="sidebar__dialogChoice__avatar"><a href="#"><img src="static/img/nav/1_nav.png" /></a></div>
                      <div className="sidebar__dialogChoice__name"><a href="#">Иван Иванов</a></div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <div className="sidebar__dialogChoice__avatar"><a href="#"><img src="static/img/nav/1_nav.png" /></a></div>
                      <div className="sidebar__dialogChoice__name"><a href="#">Петр Петров</a></div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <div className="sidebar__dialogChoice__avatar"><a href="#"><img src="static/img/nav/1_nav.png" /></a></div>
                      <div className="sidebar__dialogChoice__name"><a href="#">Сидр Сидоров</a></div>
                    </li>
                  </ul>
                </nav>
              </aside>
             </div>
        );
	}
}


export default MessageMenu
