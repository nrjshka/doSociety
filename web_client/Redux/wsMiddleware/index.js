import {getMessageInfo, setUserStatus} from '../Actions';
import {GET_MESSAGE, WS_CONNECT, WS_DISCONNECT, WS_SEND_MESSAGE} from "../Consts"
import * as queryString from 'query-string'


const socketMiddleware = (function(){
	var socket = null;
	var doWhileOpen = [];

	const onOpen = (ws, store) => evt => {
		for (let i = 0; i < doWhileOpen.length; i++){
			socket.send(JSON.stringify({type: doWhileOpen[i].type, to: doWhileOpen[i].payload}));
		}
	}

	const onClose = (ws, store) => evt => {
		// Тут код на отключение
	}

	const onMessage = (ws, store) => evt => {
		var data = JSON.parse(evt.data);
		switch (data.type){
			case 'RELOAD_MESSAGE':
					if (Number(queryString.parse(window.location.search).to) == Number(data.to))
						getMessageInfo(parseInt(data.to))(store.dispatch);
				break;
			case 'WS_GET_STATUS':
					console.log('STATUS of USER', data.status)
					setUserStatus(data.to, data.status)(store.dispatch);
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
			        socket = new WebSocket("ws://95.138.10.52:5012", [data.id]);
			        
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
				    	// раньше мы отправляли на обновление всю переписку, теперь мы будем апендить в коде
				    	getMessageInfo(action.payload.to)(store.dispatch);
				    })
		      break;
		    case 'WS_GET_STATUS':
			    	if (socket != null)
			    		socket.send(JSON.stringify({type: 'WS_GET_STATUS', to: action.payload.to}));
		    		else {
		    			doWhileOpen.push(action);
		    		}
		    	break;
		    default:
		    	return next(action);				 
		}

	}

})();

export default socketMiddleware;
