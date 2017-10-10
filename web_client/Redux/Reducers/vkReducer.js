import {VK_LOGIN} from '../Consts'

export default function vkReducer(state = null, action){
	switch (action.type){
		case VK_LOGIN:
				return Object.assign({}, state, action.payload.response[0])
			break;
	}

	return state;
}