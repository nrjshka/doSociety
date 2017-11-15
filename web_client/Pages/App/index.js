import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router'
import { IndexRoute, BrowserRouter} from 'react-router-dom'

//Подключение компонентов

import Index from '../Index/'
import NotFound from '../404'
import UserPage from '../UserPage'
import Linker  from '../Linker'
import Message from '../Message'
import Quest from '../Quest'
import FriendsLinker from '../FriendsLinker'

class App extends Component {
	componentDidMount(){
		var head = document.getElementById('head');
		var script = document.createElement('script');
		script.src = "static/js/scripts.min.js";
		head.appendChild(script);
	}
	
	render(){
		return(
			<div>
				<BrowserRouter>
			    	<Switch>
					    <Route exact path="/" component={Index} />
					    <Route path="/friends" component={FriendsLinker} />
					    <Route path="/id:id" component={UserPage} />
						<Route path="/msg" component={Message} />
					    <Route path="/quest" component={Quest} />
					    <Route path="/settings" component={Linker} />
					    <Route path="*" component={NotFound} />
					</Switch>
			    </BrowserRouter>
			</div>
		);
	}
}

export default App
