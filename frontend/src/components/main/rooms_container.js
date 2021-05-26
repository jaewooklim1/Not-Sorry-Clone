import { connect } from 'react-redux';
import { fetchRooms, createNewRoom } from '../../actions/room_actions';
import { openModal } from '../../actions/modal_actions'
import Rooms from './rooms';  

const mSTP= (state)=> ({
    rooms: state.entities.rooms.data
}); 

const mDTP= (dispatch)=> ({ 
    fetchRooms: ()=> dispatch(fetchRooms()), 
    createRoom: (room)=> dispatch(createNewRoom(room)), 
    openModal: modal => dispatch(openModal(modal))
})

export default connect(mSTP, mDTP)(Rooms);

