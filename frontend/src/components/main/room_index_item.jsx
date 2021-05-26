import React from 'react'; 

const RoomIndexItem=({room})=>{ 
    return(
        <div>
            <li>
                {room.roomname}
            </li>
        </div>
    )
}

export default RoomIndexItem