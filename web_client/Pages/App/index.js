import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router'
import { IndexRoute, BrowserRouter} from 'react-router-dom'

//Подключение компонентов

import Index from '../Index/'
import NotFound from '../404'
import UserPage from '../UserPage'
import Settings from '../Settings/'
import Message from '../Message'

class App extends Component {
	render(){
		return(
			<div>
				<BrowserRouter>
			    	<Switch>
					    <Route exact path="/" component={Index} />
					    <Route path="/id:id" component={UserPage} />
					    <Route path="/settings" component={Settings} />
						<Route path="/msg" component={Message} />
					    <Route path="*" component={NotFound} />
					</Switch>
			    </BrowserRouter>
			</div>
		);
	}
}

export default App
