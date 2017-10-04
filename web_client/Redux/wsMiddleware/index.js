import {getMessageInfo} from '../Actions';
import {GET_MESSAGE, WS_CONNECT, WS_DISCONNECT, WS_SEND_MESSAGE} from "../Consts"


const socketMiddleware = (function(){
	var socket = null;

	const onOpen = (ws, store) => evt => {
	}

	const onClose = (ws, store) => evt => {
		// Тут код на отключение
	}

	const onMessage = (ws, store) => evt => {
		console.log(evt.data);
		var data = JSON.parse(evt.data);
		switch (data.type){
			case 'RELOAD_MESSAGE':
					getMessageInfo(parseInt(data.to))(store.dispatch);
				break;
		}
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
				.then(function(response){ return response.json()})
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
		    	    fetch('/api/addmessage/',{
				    	method: 'POST',
				    	headers : {
				        	'Content-Type': 'application/json',
				        	'Accept': 'application/json',
			    			'Authorization' : 'JWT ' + localStorage.getItem('token'),
				      	},
				      	body: JSON.stringify({
				        	receiver_id: action.payload.to ,
				        	text: action.payload.data.message,
				       	}
				      )
				    })
				    .then( (result) => {return result.json()})
				    .then( (data) => {
		    			socket.send(JSON.stringify({type: 'RELOAD_MESSAGE', to: action.payload.to}));
				    	getMessageInfo(action.payload.to)(store.dispatch);
				    })
		      break;
		    default:
		    	return next(action);				 
		}

	}

})();

export default socketMiddleware;
