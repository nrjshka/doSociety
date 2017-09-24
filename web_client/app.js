import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

import { App } from './Pages';
import Reducers from './Redux';

console.log('Token ',localStorage.getItem('token'));

//Redux
const middleware = applyMiddleware(thunk);
const store = createStore(Reducers, middleware);

var client = new WebSocket("ws://localhost:5012");
//Подгрузка модулей

ReactDOM.render(
		<Provider store={store} >
			<App />
		</Provider>,
		document.getElementById('site'));

