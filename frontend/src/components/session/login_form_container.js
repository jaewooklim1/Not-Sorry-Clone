import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form';
import { Link } from 'react-router-dom';

const mSTP = (state) => {
  return {
    errors: state.errors.session, 
    navLink: <Link to="/signup">Sign up</Link>
  }
};
  
const mDTP = (dispatch) => {
  return {
    login: user => dispatch(login(user))
  }
}; 
  
export default connect(mSTP, mDTP)(LoginForm);