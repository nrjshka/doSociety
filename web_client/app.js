import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux'

import { App } from './Pages';
import Reducers from './Reducers'

//console.log('Token ',localStorage.getItem('token'));

//Redux
const store = createStore(Reducers, 0);

store.subscribe( () => {
	console.log('Store changes', store.getState());
})

store.dispatch({type: "INC", payload: 1})
//Подгрузка модулей

ReactDOM.render(
		<Provider store={store} >
			<App />
		</Provider>,
		document.getElementById('site'));
