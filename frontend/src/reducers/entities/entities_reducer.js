import { combineReducers } from 'redux';
import roomsReducer from './rooms_reducer';
import liveRoomReducer from './live_room_reducer';
import roomsReducer from './rooms_reducer'
import users from './users_reducer'

export default combineReducers({ 
    rooms: roomsReducer,
    liveRoom: liveRoomReducer, 
    users
});

// export default combineReducers({ 
//     rooms: roomsReducer,
//     users
// }); 