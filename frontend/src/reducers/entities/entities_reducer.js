import { combineReducers } from 'redux';
import roomsReducer from './rooms_reducer'

export default combineReducers({ 
    rooms: roomsReducer
}); 