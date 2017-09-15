import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './Pages';

//console.log('Token ',localStorage.getItem('token'));
//Подгрузка модулей

ReactDOM.render(<App />,
		document.getElementById('site'));
