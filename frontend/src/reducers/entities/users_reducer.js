import { RECEIVE_USERS } from '../../actions/session_actions';

  const userReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_USERS:
       return action.users; 
      default:
        return state;
    }
  }
  
  export default userReducer;