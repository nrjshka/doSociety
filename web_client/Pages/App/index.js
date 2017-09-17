import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router'
import { IndexRoute, BrowserRouter} from 'react-router-dom'

//Подключение компонентов

import Index from '../Index/'
import NotFound from '../404'
import UserPage from '../UserPage'
import Settings from '../Settings/'
import Ideology from '../Ideology/'
import Family from '../Family/'
import Biography from '../Biography/'
import Message from '../Message'

class App extends Component {
	render(){
		return(
<<<<<<< HEAD
			<div>
				<BrowserRouter>
			    	<Switch>
					    <Route exact path="/" component={Index} />
					    <Route path="/id:id" component={UserPage} />
						<Route path="/ilg" component={Ideology} />
						<Route path="/fml" component={Family} />
						<Route path="/bio" component={Biography} />
					    <Route path="/settings" component={Settings} />
						<Route path="/msg" component={Message} />
					    <Route path="*" component={NotFound} />
					</Switch>
			    </BrowserRouter>
			</div>
=======
			<BrowserRouter>
			    <Switch>
					<Route exact path="/" component={Index} />
					<Route path="/id:id" component={UserPage} />
					<Route path="/settings" component={Settings} />
				    <Route path="/msg" component={Message} />
					<Route path="*" component={NotFound} />
				</Switch>
			</BrowserRouter>
>>>>>>> a748ce06be939f1b4e623f9b12199ee067be382f
		);
	}
}

export default App
