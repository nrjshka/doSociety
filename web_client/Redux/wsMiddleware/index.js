import Actions from '../Actions';
import {GET_MESSAGE, WS_CONNECT, WS_DISCONNECT, WS_SEND_MESSAGE} from "../Consts"


const socketMiddleware = (function(){
	var socket = null;

	const onOpen = (ws, store) => evt => {
	}

	const onClose = (ws, store) => evt => {
		// Тут код на отключение
	}

	const onMessage = (ws, store) => evt => {
		console.log('Getting message: ' + evt.data)
	}

	return store => next => action => {
		switch (action.type){
			case WS_CONNECT:
				if(socket != null) {
		        	socket.close();
		        }

		        fetch('/api/getid/', {
					method: 'GET',
					headers : {
						'Authorization' : 'JWT ' + localStorage.getItem('token'),
					},
				})
				.then(function(response){return response.json()})
				.then( (data) => {
			        socket = new WebSocket("ws://localhost:5012", [data.id]);
			        
			        socket.onmessage = onMessage(socket, store);
			        socket.onclose = onClose(socket, store);
			        socket.onopen = onOpen(socket, store);
			     })
			  break;

			case WS_DISCONNECT:
				if(socket != null) {
		        	socket.close();
		        }
		      break;
		    case WS_SEND_MESSAGE:
		    	socket.send(JSON.stringify(action.payload));
		      break;
		    default:
		    	return next(action);				 
		}

	}

})();

export default socketMiddleware;