import React from 'react'; 
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import AddRoomContainer from '../main/add_room_container'; 
import '../../modal.css'

const Modal= ({ modal, closeModal})=> { 
    if (!modal){ 
        return null; 
    }
    let component;
    switch (modal) {
      case 'addRoom':
        component = <AddRoomContainer /> ;
        break; 
      default:
        return null;
    }
    return ( 
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    )
}

const mSTP = (state, ownProps) => {
    return {
      modal: state.ui.modal.modal
    };
};
  
const mDTP = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};
  
export default connect(mSTP, mDTP)(Modal);