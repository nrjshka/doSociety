import {GET_MESSAGE, GET_USER_INFO} from '../Consts'

export default function messageReducer(state = {msg_data: null}, action){
	switch (action.type){
		case GET_MESSAGE:
				//отправляет загруженную информацию
				return Object.assign({}, state, action.payload)
			break;
		case GET_USER_INFO:
				//добавляет в стейт информацию пользователя
				return Object.assign({}, state, action.payload)
			break;
	}

	return state;
}