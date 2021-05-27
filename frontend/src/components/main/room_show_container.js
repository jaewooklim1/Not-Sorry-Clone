import {connect} from 'react-redux';
import { fetchGameRoom } from '../../actions/room_actions';  
import RoomShowPage from './room_show_page'

const mSTP= (state, ownProps)=> { 
    return({ 
        roomId: ownProps.match.params.roomId, 
        userId: state.session.user.id,
        rooms: state.entities.rooms
    })
}

const mDTP = dispatch => { 
    return ({ 
        fetchRoom: room=> dispatch(fetchGameRoom(room))
    })
} 

export default connect(mSTP, mDTP)(RoomShowPage); 