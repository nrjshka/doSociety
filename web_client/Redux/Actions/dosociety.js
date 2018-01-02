import {DS_REGISTRATION} from "../Consts"

export function dsRegistration(props){
	return (dispatch) => {
		fetch('/api/register/',{
		    method: "POST",
		    headers : {
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify({
				login: props.login, 
				fname: props.first_name,
				sname: props.last_name, 
				hometown: props.city,
				userFoto: props.photo_max_orig,
				workplace: 'None',
				birthDate: props.bdate,
				password: props.password,
	        	uid: props.uid,
	        	vk_groups: props.vk_groups,
	        }
	      )
	    })
	    .then( (result) => {return result.json()})
	    .then( (data) => {
	    	//отправляем "удачный" ответ бекенда
	    	dispatch({type: DS_REGISTRATION, payload: props})
	    	//получаем токен и производим редирект
		    fetch('/api/token-auth/', {
				method: 'POST',
				headers : {
	    			'Content-Type': 'application/json',
	    			'Accept': 'application/json',
				},
				body: JSON.stringify({
					username: props.login,
					password: props.password,
				}
				)
			})
			.then( (response) => {
				return response.json();
			})
			.then( (data) => {
				//суем токен
				localStorage.setItem('token', data['token']);
				//получаем id
				fetch('/api/getid/', {
					method: 'GET',
					headers : {
			    		'Authorization' : 'JWT ' + localStorage.getItem('token'),
					},
				})
				.then( (response) => {
					return response.json();
				})
				.then((data) => {
					// тут нужно будет отправлять группы
					localStorage.setItem('id', data['id']);
					document.location.href = '/id' + data['id'];
				});
			})
	    }) 
	}
}