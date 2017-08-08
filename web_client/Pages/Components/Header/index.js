import React, { Component } from 'react'


class Header extends Component{
	render(){
		return(
			<header className="header container-flued">
	        	<div className="header__logo"><a href="#"><img src={this.props.logo} /></a></div>
	        	<form className="formSearch" action="" method="get">
	          		<input className="formSearch__input" name="s" placeholder="Поиск..." type="search" required="" />
	          		<button className="formSearch__button" type="submit"> 
	          			<img src={this.props.search} />
	          		</button>
	            </form>
	        </header>
		);
	}
}

export default Header

