import {DS_REGISTRATION} from "../Consts"

export default function dsReducer(state = null, action){
	switch (DS_REGISTRATION){
		case DS_REGISTRATION:
				//отправляем обработанные данные
				return Object.assign({}, state, action.payload)
			break;
	}
	return state;
}