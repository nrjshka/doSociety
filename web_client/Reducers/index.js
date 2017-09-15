import {combineReducers} from 'redux';
import messageDefault from './messageDefault';

const allReducers = combineReducers({
    message: messageDefault
});

export default allReducers
