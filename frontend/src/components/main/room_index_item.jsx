import React from 'react'; 
import { useSelector } from 'react-redux';
import { socket } from '../app';

const RoomIndexItem=({room})=>{ 
    const user_id = useSelector(store => store.session.user.id)

    
    return(
        <div >
            <li>
               {room.roomname}
            </li>
            <button onClick={() => {console.log("ON CLICK"); socket.emit('join_room', {room, user_id})}}>
                Join Room
            </button>
        </div>
    )
}

export default RoomIndexItem