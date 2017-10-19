import {combineReducers} from 'redux';
import message from './Reducers/messageReducer';
import vk from './Reducers/vkReducer';
import doSociety from './Reducers/dsReducer';

export default combineReducers({
    message,
    vk,
    doSociety
});
