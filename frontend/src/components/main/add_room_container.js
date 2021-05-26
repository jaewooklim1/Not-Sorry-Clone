import { connect } from 'react-redux'; 
import { createNewRoom } from '../../actions/room_actions';
import {closeModal} from '../../actions/modal_actions'; 
import AddRoom from './add_room_form'; 

const mSTP= (state)=> ({ 
    room: { 
        roomname:''
    }
})

const mDTP = (dispatch) => ({ 
    createRoom: roomData => dispatch(createNewRoom(roomData)), 
    closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(AddRoom); 