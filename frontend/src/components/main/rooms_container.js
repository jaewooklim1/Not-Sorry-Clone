import { connect } from 'react-redux';
import { fetchRooms, createRoom } from '../../actions/room_actions';
import Rooms from './rooms';  

const mSTP= (state)=> ({

}); 

const mDTP= (dispatch)=> ({ 
    fetchRooms: ()=> dispatch(fetchRooms()), 
    createRoom: (room)=> dispatch(createRoom(room))
})

export default connect(null, mDTP)(Rooms);