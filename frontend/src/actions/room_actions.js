// import { fetchAllRooms, 
//     fetchUsersRooms,
//     getRoom, 
//     createRoom, 
//     updateRoom, 
//     removeRoom} from '../util/room_api_util'; 

// export const RECEIVE_ROOMS= "RECEIVE_ROOMS"; 
// export const RECEIVE_ROOM= "RECEIVE_ROOM"; 
// export const RECEIVE_ROOM_DATA = "RECEIVE_ROOM_DATA";
// export const RECEIVE_NEW_ROOM = "RECEIVE_NEW_ROOM"; 
// export const RECEIVE_ROOM_ERRORS= "RECEIVE_ROOM_ERRORS"; 
// export const REMOVE_ROOM_ERRORS= "REMOVE_ROOM_ERRORS";


// export const receiveRooms = rooms => ({ 
//     type: RECEIVE_ROOMS, 
//     rooms
// }); 

// export const receiveRoom = room => ({ 
//     type: RECEIVE_ROOM, 
//     room
// }); 

// export const receiveRoomData = roomData => ({
//     type: RECEIVE_ROOM_DATA,
//     room: roomData,
// });

// export const receiveNewRoom = room => ({
//     type: RECEIVE_NEW_ROOM,
//     room,
// });

// export const receiveRoomErrors= errors => ({ 
//     type: RECEIVE_ROOM_ERRORS, 
//     errors
// }); 

// export const removeRoomErrors= ()=> ({
//     type: REMOVE_ROOM_ERRORS

// }); 

// export const fetchRooms=()=> dispatch => (
//     fetchAllRooms()
//         .then(rooms => dispatch(receiveRooms(rooms)))
//         .catch(err => console.log(err))
// ); 

// export const createRoom=(roomData)=> dispatch => ( 
//     createRoom(roomData)
//         .then(room => dispatch(receiveNewRoom(room)))
//         .catch(err => console.log(err))
// )

// export const updateRoom=(roomData)=> dispatch => (
//     updateRoom(roomData)
//         .then(room=> dispatch(receiveRoom(room)))
//         .catch(err => console.log(err))
// )

// export const getRoomData=(roomId)=> dispatch => (
//     getRoom(roomId)
//         .then(roomData=> dispatch(receiveRoomData(roomData)))
//         .catch(err => console.log(err))
// )