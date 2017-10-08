import {combineReducers} from 'redux';
import message from './Reducers/messageReducer';
import vk from './Reducers/vkReducer';

export default combineReducers({
    message,
    vk
});
