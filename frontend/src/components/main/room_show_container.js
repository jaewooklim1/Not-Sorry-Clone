import {connect} from 'react-redux'; 
import RoomShowPage from './room_show_page'
const mSTP= state=> { 
    return({ 
        roomname: state.entities.rooms
    }
    )
}

const mDTP = dispatch => { 
    return ({ 

    })
} 

export default connect(mSTP, null)(RoomShowPage); 