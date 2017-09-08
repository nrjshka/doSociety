import React, { Component } from 'react'



class Settings extends Component{
	render(){
		return(
  		<div>
  	   	<div className="col-lg-2 col-md-2 hidden-sm hidden-xs hidden-smNo">
            <aside className="sidebar">
              <nav className="sidebar__register">
                <ul>
                  <li><a href="#">Настройка аккаунта</a></li>
                </ul>
                <ul>
                  <li><a href="#">Биография</a></li>
                </ul>
                <ul>
                  <li><a href="#">Мировоззрение</a></li>
                </ul>
              </nav>
            </aside>
          </div>
  		</div>
		);
	}
}


export default Settings
