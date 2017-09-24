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

class App extends Component {
	render(){
		return(
			<div>
				<BrowserRouter>
			    	<Switch>
					    <Route exact path="/" component={Index} />
					    <Route path="/id:id" component={UserPage} />
						<Route path="/msg" component={Message} />
					    <Route path="/quest" component={Quest} />
					    <Linker />
					    <Route path="*" component={NotFound} />
					</Switch>
			    </BrowserRouter>
			</div>
		);
	}
}

export default App
