import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router'
import { IndexRoute, BrowserRouter} from 'react-router-dom'

import Settings from '../Settings/MainSettings/'
import Ideology from '../Settings/Ideology/'
import Family from '../Settings/Family/'
import Biography from '../Settings/Biography/'

class Linker extends Component{	
	render(){
		var illusionURL = window.location.search;

		switch(illusionURL){
			case "?p=ilg":
				return(<Route component={Ideology} />)
			break
			case "?p=bio":
				return(<Route component={Biography} />)
			break
			case "?p=fml":
				return(<Route component={Family} />)
			break
			default: return(<Route component={Settings} />);	
		}
	}
}

export default Linker
