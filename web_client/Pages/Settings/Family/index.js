import React, { Component } from 'react'

import Header from '../../Components/Header/'
import Menu from '../../Components/Menu'
import FamilyBody from '../../Components/FamilyBody/'
import SettingsMenu from '../../Components/SettingsMenu/'

class Family extends Component{
	componentDidMount(){
		var head = document.getElementById('head');
		var script = document.createElement('script');
		script.src = "static/js/scripts.min.js";
		head.appendChild(script);
	}
	
    render(){
        return(
            <div id="index">
            <div className="buttonNavigator">&raquo;</div>
            <div className="buttonSidebar">&laquo;</div>
            <Header logo="static/img/logo/logo.png" search="static/img/search/search.png"/>
            <div className="container">
                <div className="row">
                    <Menu />
                    <FamilyBody />
                    <SettingsMenu />
                </div>
            </div>
            </div>
        )
    }
}

export default Family
