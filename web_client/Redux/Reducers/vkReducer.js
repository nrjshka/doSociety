import {VK_LOGIN} from '../Consts'

export default function vkReducer(state = null, action){
	switch (action.type){
		case VK_LOGIN:
				VK.Auth.login( (r) =>{
					if (r.session){
						console.log(r);
						console.log('VK-TRUE');
		
	            		var data = r.session;
			            var user = r.session.user;

			            VK.Api.call('users.get', { fields: 'email, first_name, last_name, city, sex, photo_max_orig, bdate, email' }, function(res) {
			            	console.log(res);
			            })
					}else {
						console.log(r);
						console.log('VK-FALSE');
					}
				}, 5505295)
				return state;
			break;
	}

	return state;
}