import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Settings extends Component{
	render(){
		return(
  		<div>
  	   	<div className="col-lg-2 col-md-2 hidden-sm hidden-xs hidden-smNo">
            <aside className="sidebar">
              <nav className="sidebar__register">
                 <ul>
                  <li><Link to="/settings">Настройка аккаунта</Link></li>
                </ul>
                <ul>
                  <li><Link to="/settings?p=bio">Биография</Link></li>
                </ul>
        <ul>
                  <li><Link to="/settings?p=fml">Родственники</Link></li>
                </ul>
                <ul>
                  <li><Link to="/settings?p=ilg">Мировоззрение</Link></li>
                </ul>
              </nav>
            </aside>
          </div>
  		</div>
		);
	}
}


export default Settings
