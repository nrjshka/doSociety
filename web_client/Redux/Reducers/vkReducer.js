import {VK_LOGIN} from '../Consts'

export default function vkReducer(state = null, action){
	switch (action.type){
		case VK_LOGIN:
				return Object.assign({}, state, action.payload)
			break;
	}

	return state;
}