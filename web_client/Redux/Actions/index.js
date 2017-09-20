import {GET_MESSAGE} from "../Consts"

export default function getMessageInfo(id){
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
	    	dispatch({type: GET_MESSAGE, payload: data});
	    }) 
	}
}