import {connect} from 'react-redux';
import { fetchGameRoom } from '../../actions/room_actions';  
import { fetchUsers  } from '../../actions/session_actions';  
import RoomShowPage from './room_show_page'

const mSTP= (state, ownProps)=> { 
    // console.log("mSTP show room", state);
    return({ 
        roomId: ownProps.match.params.roomId, 
        userId: state.session.user.id,
        rooms: state.entities.rooms,
        liveRoom: state.entities.liveRoom.liveRoom,
        users: state.entities.users,
    })
}

const mDTP = dispatch => { 
    return ({ 
        fetchRoom: room => dispatch(fetchGameRoom(room)),
        fetchUsers: ()=> dispatch(fetchUsers())
    })
} 

export default connect(mSTP, mDTP)(RoomShowPage); 