import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';
import SignupForm from './signup_form';
import { Link } from 'react-router-dom';


const mSTP = (state) => {
    return {
      signedIn: state.session.isSignedIn,
      errors: state.errors.session, 
      navLink: <Link to="/login">Log in</Link>
    };
};

const mDTP = (dispatch) => {
    return {
      signup: user => dispatch(signup(user)), 
      login: user => dispatch(login(user))
    }
};

export default connect(mSTP, mDTP)(SignupForm); 