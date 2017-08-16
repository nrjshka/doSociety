import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router'
import { IndexRoute, BrowserRouter} from 'react-router-dom'
//Подключение компонентов

import Index from '../Index/'
import NotFound from '../404'
import UserPage from '../UserPage'
import Settings from '../Settings/'

class App extends Component {

	render(){
		return( 
			<BrowserRouter>
		    	<Switch>
				    <Route exact path="/" component={Index} />
				    <Route exact path="/id*" component={UserPage} />
				    <Route exact path="/settings" component={Settings} />
				    <Route exact path="*" component={NotFound} />
				</Switch>
		    </BrowserRouter>
		);
	}
}

export default App