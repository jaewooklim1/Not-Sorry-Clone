import { 
    RECEIVE_ROOMS, 
    RECEIVE_ROOM, 
    RECEIVE_ROOM_DATA, 
    RECEIVE_NEW_ROOM,
}from '../../actions/room_actions'; 

export default (state={}, action)=> { 
    Object.freeze(state); 
    let state; 
    switch (action.type) {
        case RECEIVE_ROOMS:
            return Object.assign({}, action.rooms)
        case RECEIVE_ROOM: 
            return Object.assign({}, state, {[action.room.id] : action.room});
        case RECEIVE_ROOM_DATA: 
            return Object.assign({}, state, { [action.room.id]: action.roomData})
        case RECEIVE_NEW_ROOM: 
            return Object.assign({}, state, {[action.room.id]: action.room})
        default:
            return state;
    }
}