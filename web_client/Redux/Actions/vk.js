import {VK_LOGIN} from "../Consts"

export function vkLogin(){
			return (dispatch) => {
				VK.Auth.login( (r) =>{
					//only debug mod = true
					//console.log(r);
					if (r.session){
	            		var data = r.session;
			            var user = r.session.user;

			            fetch('/api/check-register/', {
					        method: "POST",
					        headers : {
					            'Content-Type': 'application/json',
					        },
					        body: JSON.stringify({
					            vk_id:  data.mid, 
					        }
					      )
					    })
					    .then( (result) => {return result.json()})
					    .then( (data) => {
					    	if (data['status']){
						    	//отправляем метод на обработку, если человек не зарегистрирован
						    	VK.Api.call('users.get', { fields: 'email, first_name, last_name, city, sex, photo_max_orig, bdate, email' }, 
				            	(res) => {
									dispatch({
										type: VK_LOGIN,
										payload: res
									})
				            	  }
				            	)
				            }
					    })

					}else {
						//что будет в "плохом случае"
					}
				}, 5505295)
			}
		}