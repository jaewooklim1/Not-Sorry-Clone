// import rooms from '../../../../validation/rooms';
import { 
    RECEIVE_ROOMS,
    RECEIVE_ROOM,  
    RECEIVE_NEW_ROOM,
    REMOVE_ROOM
}from '../../actions/room_actions'; 

const roomsReducer= (state={}, action)=> { 
    Object.freeze(state); 
    // let newState = Object.assign({}, state); 
    switch (action.type) {
        case RECEIVE_ROOMS:
            // return action.rooms;
            let newState = {};
            action.rooms.forEach(room => {newState[room._id] = room}) 
            return newState;
        case RECEIVE_NEW_ROOM: 
            return Object.assign({}, state, {[Object.keys(state).length]: action.room}); 
        case RECEIVE_ROOM: 
            return Object.assign({}, state, {[action.room._id]: action.room});
        case REMOVE_ROOM:
            let newerState = Object.assign({}, state)
            delete newerState[action.roomId];
            return newerState;
        default:
            return state;
    }
}

export default roomsReducer

