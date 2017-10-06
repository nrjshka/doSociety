import {GET_MESSAGE, WS_CONNECT, WS_SEND_MESSAGE,
		GET_USER_INFO} from "../Consts"

export function getMessageInfo(id){
		return (dispatch) => {
			fetch('/api/getmessagedata/',{
		        method: "POST",
		        headers : {
		            'Content-Type': 'application/json',
		            'Authorization' : 'JWT ' + localStorage.getItem('token'),
		        },
		        body: JSON.stringify({
		            receiver_id:  id 
		        }
		      )
		    })
		    .then( (result) => {return result.json()})
		    .then( (data) => {
		    	dispatch({type: GET_MESSAGE, payload: Object.assign({}, data, {oldTo: id}) });
		    }) 
		}
	}


export function getUserInfo(id){
		return (dispatch) => {
			fetch('/api/getuserinfo/',{
				method: 'POST',
			    headers : {
			        'Content-Type': 'application/json',
			        'Accept': 'application/json',
			    },
			    body: JSON.stringify({
			        id:  id 
			    }
			  )
			})
			.then( (result) => {return result.json()})
			.then( (data) => {
					dispatch({type: GET_USER_INFO, payload: Object.assign({}, data) 
				})
			})	    
		}
	}

export function wsCreate(){
			return (dispatch) => dispatch({type: WS_CONNECT});
		}

export function wsMessage(message, to){
		//TODO: переписать этот кусок, не нужно дергать каждый раз `getid`
		var outputArray = {};
		outputArray.type = 'MESSAGE';
		outputArray.to = to;
		outputArray.data = {message: message};
		return (dispatch) => {
			dispatch(
				{	
					type: WS_SEND_MESSAGE, 
					payload: outputArray
				}
			)
		}
	}
