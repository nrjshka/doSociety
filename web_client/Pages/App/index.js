import React, { Component } from 'react'
import { Router, Route } from 'react-router'
import { IndexRoute, BrowserRouter} from 'react-router-dom'
//Подключение компонентов

import Index from '../Index/'

class App extends Component {
	render(){
		return( 
			<BrowserRouter>
		    	<Route path="/" component={Index} />
		    </BrowserRouter>
		);
	}
}

export default App