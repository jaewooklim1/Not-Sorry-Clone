import { connect } from 'react-redux';
import { fetchRooms, createNewRoom, deleteRoom } from '../../actions/room_actions';
import { openModal } from '../../actions/modal_actions'
import Rooms from './rooms';  

const mSTP= (state)=> {
    // console.log(state);
    // debugger 
    return ({
    rooms: Object.values(state.entities.rooms),
    currentUser: state.session.user
})}; 

const mDTP= (dispatch)=> ({ 
    fetchRooms: ()=> dispatch(fetchRooms()), 
    createRoom: (room)=> dispatch(createNewRoom(room)), 
    openModal: modal => dispatch(openModal(modal)),
    deleteRoom: roomId => dispatch(deleteRoom(roomId))
})

export default connect(mSTP, mDTP)(Rooms);

