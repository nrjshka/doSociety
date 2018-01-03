import {DS_REGISTRATION} from "../Consts"

export default function dsReducer(state = {users: null}, action){
	switch (action.type){
		case DS_REGISTRATION:
				//отправляем обработанные данные
				return Object.assign({}, state, action.payload)
			break;
		case 'SET_USER_STATUS':
				return Object.assign({}, state.users, {'id' : action.payload.id, 'status': action.payload.status})
			break;
	}
	return state;
}