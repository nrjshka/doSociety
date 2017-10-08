import {VK_LOGIN} from "../Consts"

export function vkLogin(){
			return (dispatch) => {
				dispatch({
					type: VK_LOGIN
				})
			}
		}