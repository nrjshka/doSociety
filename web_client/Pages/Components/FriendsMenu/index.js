import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class FriendsMenu extends Component{
	render(){
		return(
  		<div>
  	   	<div className="col-lg-2 col-md-2 hidden-sm hidden-xs hidden-smNo">
            <aside className="sidebar">
              <nav className="sidebar__register">
                 <ul>
                  <li><Link to="/friends">Друзья</Link></li>
                </ul>
                <ul>
                  <li><Link to="/friends?p=in">Входящие заявки</Link></li>
                </ul>
        <ul>
                  <li><Link to="/friends?p=out">Исходящие заявки</Link></li>
                </ul>
              </nav>
            </aside>
          </div>
  		</div>
		);
	}
}


export default FriendsMenu
