import {GET_MESSAGE} from '../Consts'

export default function messageReducer(state = {msg_data: null}, action){
	switch (action.type){
		case GET_MESSAGE:
				//отправляет загруженную информацию
				return Object.assign({}, state, action.payload)
			break;
	}

	return state;
}