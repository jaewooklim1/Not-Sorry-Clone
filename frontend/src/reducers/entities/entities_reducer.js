import { combineReducers } from 'redux';
import roomsReducer from './rooms_reducer'
import users from './users_reducer'

export default combineReducers({ 
    rooms: roomsReducer,
    users
}); 