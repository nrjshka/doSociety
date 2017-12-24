import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router'
import { IndexRoute, BrowserRouter} from 'react-router-dom'

import Friends from '../Friends/MainFriends/'
import InFriends from '../Friends/InFriends/'
import OutFriends from '../Friends/OutFriends/'

class FriendsLinker extends Component{	
	render(){
		var illusionURL = window.location.search;

		switch(illusionURL){
			case "?p=in":
				return(<Route component={InFriends} />)
				break;
			case "?p=out":
				return(<Route component={OutFriends} />)
				break;
			case "": 
				return(<Route component={Friends} />);	
				break;
		}
	}
}

export default FriendsLinker