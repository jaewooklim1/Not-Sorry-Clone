import React from 'react';
import '../../styling/splash.scss';
import {AuthRoute, ProtectedRoute} from '../../util/route_util';
import login_form_container from '../session/login_form_container';
import signup_form_container from '../session/signup_form_container';
import rooms_container from '../main/rooms_container';
import {Link, Switch} from 'react-router-dom';
import Modal from '../main/Learn_to_play_modal';
import LoginModal from '../main/Login_modal';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <a>
          <div>
            {/* <h1>Hi, {this.props.user} </h1> upon logout i receive a username undefined error*/}

            <div className="logout-button" onClick={this.logoutUser}>
              Logout
            </div>
          </div>
        </a>
      );
    } else {
      return (
        <div>
          {/* <Link to={'/signup'}>Signup</Link>
                  <Link to={'/login'}>Login</Link> */}
        </div>
      );
    }
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <h1></h1>
        <div className="sorry-banner" style={{position: 'relative'}}>
          <div className="sorry-logo-container">
            <img
              className="sorry-logo-transparent"
              src="https://i.imgur.com/W793ME4.png"
            />
          </div>
          <div>
            <ul className="banner-menu">
              {/* <NavBarContainer />   */}
              <Link exact to="/" className="first-menu">
                Home
              </Link>
              <Link exact to="/rooms" className="second-menu">
                Rooms
              </Link>
              <Modal></Modal>
              {/* <a className='second-menu' href='https://www.youtube.com/watch?v=y-puYiDeIhg'>Learn to Play</a> */}
              {/* <a className='fourth-menu' href='www.google.com'>Fourth Menu</a> */}
              {/* <LoginModal></LoginModal>      */}
              <Link exact to="/login" className="fifth-menu">
                Sign In
              </Link>
              <Link exact to="/signup" className="sixth-menu">
                Register
              </Link>
              <div className="seventh-menu">{this.getLinks()}</div>
            </ul>
            <div className="account-creation">
              {/* <Switch> */}
              {/* <AuthRoute exact path="/login" component={login_form_container} />
            <AuthRoute exact path="/signup" component={signup_form_container} /> */}
              {/* <ProtectedRoute exact path="/rooms" component={rooms_container} /> */}

              {/* </Switch> */}
            </div>
          </div>
        </div>
        {/* <img
          className="sorry-fighting-background"
          src="https://i.imgur.com/OArg4Vz.png"
        /> */}
      </div>
    );
  }
}

export default NavBar;
