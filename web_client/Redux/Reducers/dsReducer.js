import {DS_REGISTRATION} from "../Consts"

export default function dsReducer(state = null, action){
	switch (action.type){
		case DS_REGISTRATION:
				//отправляем обработанные данные
				return Object.assign({}, state, action.payload)
			break;
	}
	return state;
}