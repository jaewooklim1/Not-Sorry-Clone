import React from 'react';
import '../../styling/splash.scss';
import { AuthRoute } from "../../util/route_util";
import login_form_container from "../session/login_form_container";
import signup_form_container from "../session/signup_form_container";
import { Link, Switch } from 'react-router-dom';
import Modal from './Learn_to_play_modal';


class Splash extends React.Component {

  render() {
    return (
      <div className="whole-page">
        <div className="sorry-banner"style={{position: "relative"}}>
          <div className="sorry-logo-container">
            <img className="sorry-logo-transparent" src="https://i.imgur.com/DlHwK47.png"/>
          </div>
          <div>          
          <ul className="banner-menu">            
            <a className='first-menu' href='www.rooms.com'>Rooms</a>
            <Modal></Modal>
            {/* <a className='second-menu' href='https://www.youtube.com/watch?v=y-puYiDeIhg'>Learn to Play</a> */}
            <a className='fourth-menu' href='www.google.com'>Fourth Menu</a>
            <a className='fifth-menu' href='www.google.com'>Sign In</a>         
            <a className='sixth-menu' href='www.google.com'>Register</a>         
          </ul>
          <div className="account-creation">
          <Switch>
            <AuthRoute exact path="/login" component={login_form_container} />
            <AuthRoute exact path="/signup" component={signup_form_container} />
          </Switch>
          </div>
          

          </div>
        </div>
          
        <footer className='footer' style={{position: "absolute", bottom: "-1500px"}}>
          <div className="logo-background-row">
            {/* <div className="logo-background-column">
              <img className="sorry-logo-background" src="https://i.imgur.com/DlHwK47.png"/>
            </div>              */}
            <div className="logo-background-column">       
              <img className="sorry-fighting-background" src="https://i.imgur.com/OArg4Vz.png"/>
            </div> 
          </div>         
            <div className='back-to-top' onClick={() => window.scrollTo(0, 0)}>
              Back to top
            </div>
            <div className='sub-bottom-footer'>
              <div className="get-to-know-text">Get to Know the Creators</div>
              <div className='get-to-know'>
                <li id='first-creator'>
                  <a className='creator-links' href='https://www.linkedin.com/in/jae-wook-lim-430553100/'>
                    <p>Jae-Wook Lim</p>
                    <img className="profile-picture" src="https://i.imgur.com/2b588fv.jpg"/>
                  </a>
                    
                </li>
                <li id='second-creator'>
                    <a className='creator-links' href='https://www.linkedin.com/in/jae-wook-lim-430553100/'> 
                      <p>Min Wang</p>
                      <img className="profile-picture" src="https://i.imgur.com/2b588fv.jpg"/>
                    </a>                     
                </li>
                <li id='third-creator'>
                    <a className='creator-links' href='https://www.linkedin.com/in/jae-wook-lim-430553100/'>   
                      <p>Anug Saha</p>
                      <img className="profile-picture" src="https://i.imgur.com/lxcoG3J.jpg"/>
                    </a>
                </li>
                <li id='fourth-creator'>
                    <a className='creator-links' href='https://www.linkedin.com/in/jae-wook-lim-430553100/'>
                      <p>Collin Winner</p>
                      <img className="profile-picture" src="https://i.imgur.com/2b588fv.jpg"/>
                    </a>
                </li>
              </div>
            </div>
          {/* <div className='bottom-footer'>
              <Link to='/'>                
                <img className="sorry-logo-transparent" src="https://i.imgur.com/DlHwK47.png"/>                
              </Link>
          </div> */}
        </footer>       
      </div>
    );
  }
}

export default Splash;