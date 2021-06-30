import axios from 'axios'; 
import { socket } from '../components/app'; 

export const fetchAllRooms = () => { 
    return axios.get('/api/rooms')
}

// export const fetchUsersRooms= id => { 
//     return axios.get(`/api/rooms/user/${id}`)
// }

export const getRoom = roomId => { 
    return axios.get(`/api/rooms/${roomId}`)
} 

// export const createRoom = (roomData)=> { 
//     return axios.post('/api/rooms/', roomData)
// }

export const createRoom = (roomData) => { 
    return socket.emit('create_new_room', roomData)
}

// export const removeRoom = (roomId) => {
//     return socket.emit('remove_room', roomId)
// }

export const removeRoom = (roomId) => {
    return axios.delete(`/api/rooms/${roomId}`)
}

// export const updateRoom= (roomData)=> { 
//     return axios.patch(`/api/rooms/${roomData.id}`, roomData)
// }

// export const removeRoom = (roomId)=> { 
//     return axios.delete(`/api/rooms/${roomId}`)
// }