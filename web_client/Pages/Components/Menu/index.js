import React, { Component } from 'react'

import LogginedMenu from '../Menu/LogginedMenu/'
import UnlogginedMenu from '../Menu/UnlogginedMenu/'

class Menu extends Component{
	isLoggined(){
		//если существует токен в локальном хранилище
		if  (localStorage.getItem('token') != undefined) 
			return true;
		return false;
	}

	render(){
		//залогинен или нет?
		if (this.isLoggined())
			return (<LogginedMenu />);
		else
			return (<UnlogginedMenu />);
	}
}


export default Menu