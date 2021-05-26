import { connect } from 'react-redux'; 
import { createNewRoom } from '../../actions/room_actions'; 
import AddRoom from './add_room_form'; 

const mSTP= (state)=> ({ 
    room: { 
        roomname:''
    }
})

const mDTP = (dispatch) => ({ 
    createRoom: roomData => dispatch(createNewRoom(roomData))
})

export default connect(mSTP, mDTP)(AddRoom); 