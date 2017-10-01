import Actions from '../Actions';

const socketMiddleware = (function(){
	var socket = null;

	const onOpen = (ws, store) => evt => {
		console.log('Oppened');
		console.log(store.getState());
		ws.send(store.getState().oldTo);
	}

	const onClose = (ws, store) => evt => {
		console.log('Disconnected');
	}

	const onMessage = (ws, store) => evt => {
		console.log(evt);
		console.log('Getting message: ' + evt.data)
	}

	return store => next => action => {
		switch (action.type){
			case 'CONNECT':
				if(socket != null) {
		        	socket.close();
		        }

		        socket = new WebSocket("ws://localhost:5012");
		        
		        socket.onmessage = onMessage(socket, store);
		        socket.onclose = onClose(socket, store);
		        socket.onopen = onOpen(socket, store);

			  break;

			case 'DISCONNECT':
				if(socket != null) {
		        	socket.close();
		        }
		      break;
		    default:
		    	return next(action);				 
		}

	}

})();

export default socketMiddleware;