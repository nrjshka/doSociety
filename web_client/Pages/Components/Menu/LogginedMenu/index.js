import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LogginedMenu extends Component{
  constructor(props){
    super(props);
    this.state = {
      profile_url : '#',
    }
  }

  componentWillMount(){
    fetch('/api/getid/', {
          method: 'GET',
          headers : {
              'Authorization' : 'JWT ' + localStorage.getItem('token'),
          },
        })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        //назначаем url профилю

        //debug-mod = TRUE
        //console.log(data['id']);

        this.setState({profile_url: '/id' + data['id']});
    });
  }

	render(){
		return(
      <div className="col-lg-2 col-md-2 col-sm-3 hidden-xs hidden-xsNo">
  			 <nav className="navigator">
            <ul>
              <li><img src="static/img/nav/1_nav.png" /><Link to={this.state.profile_url} >Профиль</Link></li>
            </ul>
            <ul>
              <li><img src="static/img/nav/2_nav.png" /><Link to="msg?to=2">Личные сообщения</Link></li>
            </ul>
            <ul>
              <li><img src="static/img/nav/3_nav.png" /><a href="#">Конференция</a></li>
            </ul>
            <ul>
              <li><img src="static/img/nav/4_nav.png" /><a href="#">Друзья</a></li>
            </ul>
            <ul>
              <li><img src="static/img/nav/5_nav.png" /><Link to="/quest">Случайный собеседник</Link></li>
            </ul>
            <ul>
              <li><img src="static/img/nav/6_nav.png" /><a href="#">Музыка</a></li>
            </ul>
            <ul>
              <li><img src="static/img/nav/7_nav.png" /><Link to="/settings">Настройки</Link></li>
            </ul>
          </nav>
        </div>
		);
	}
}


export default LogginedMenu
