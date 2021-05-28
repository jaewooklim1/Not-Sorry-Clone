import { combineReducers } from 'redux';
import roomsReducer from './rooms_reducer';
import liveRoomReducer from './live_room_reducer';

export default combineReducers({ 
    rooms: roomsReducer,
    liveRoom: liveRoomReducer
}); 