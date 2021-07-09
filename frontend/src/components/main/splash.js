import React from 'react';
import '../../styling/splash.scss';

import NavBar from '../nav/navbar';

class Splash extends React.Component {
  render() {
    return (
      <div className="whole-page">
        <NavBar></NavBar>
        <div className="greeting-line">Welcome to NotSorry</div>
        <div className="greeting-subtitle">
          America's popular board game now online!
        </div>
        <div className="splashImage">
          <img src="https://i.imgur.com/ETjxAwz.gif" />
        </div>
        {/* <div className="bulletin-board">
          <div className="bulletin-title">
            <h2>Play the hit board game in your browser! Always free with no ads!</h2>
          </div>
          <div className="bulletin-content">
            <p>
              Sorry is a board game for 2-4 players. Players move their three or
              four pieces around the board, attempting to get all of their pieces
              "home" before any other player. The game title comes from the many
              ways in which a player can negate the progress of another, while
              issuing an apologetic "Sorry!"
            </p>
          </div>
          <div className="bulletin-link">
            <p>
              Check out our "
        
                <a href="https://github.com/jaewooklim1/Not-Sorry-Clone">
                  github page
                </a>
           
              " to learn about how the game works, or hop into the the game lobby
              itself right now.
            </p>
          </div>
        </div> */}

        {/* <div className="greeting-instructions">Instructions</div> */}
        {/* <div id="page">
          <div class="wrapper">
            <div class="bottom">
              <img src="https://i.imgur.com/ZYja6Ai.jpg" draggable="false"/>
            </div>
            <div class="middle">
              <img src="http://i.imgur.com/VdCHW0M.jpg" draggable="false"/>
            </div>
            <div class="scroller scroller-middle">
              <svg class="scroller__thumb" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><polygon points="0 50 37 68 37 32 0 50" style={{fill:"#FFCCBC"}}/><polygon points="100 50 64 32 64 68 100 50" style={{fill:"#FFCCBC"}}/></svg>
            </div>
            <div class="top">
              <img src="https://i.imgur.com/FxM8a8x.png" draggable="false"/>
            </div>
            <div class="scroller scroller-top">
              <svg class="scroller__thumb" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><polygon points="0 50 37 68 37 32 0 50" style={{fill:"#FFAB91"}}/><polygon points="100 50 64 32 64 68 100 50" style={{fill:"#FFAB91"}}/></svg>
            </div>
          </div>  
        </div> */}

        {/* <div className="test-background"></div> */}
        <footer
          className="footer"
          style={{bottom: '-50px'}}
        >
          <div className="logo-background-row">
            <div className="logo-background-column"></div>
          </div>

          {/* <div className="back-to-top" onClick={() => window.scrollTo(0, 0)}>
            Back to top
          </div> */}
          <div className="sub-bottom-footer">
            <div className="get-to-know-text">Get to Know the Creators</div>
            <div className="get-to-know">
              <li id="first-creator">
                <a
                  className="creator-links"
                  href="https://www.linkedin.com/in/jae-wook-lim-93b5b8214/"
                  target="_blank"
                >
                  <p>Jae-Wook Lim</p>
                  <img
                    className="profile-picture"
                    src="https://i.imgur.com/2b588fv.jpg"
                  />
                </a>
              </li>
              <li id="second-creator">
                <a
                  className="creator-links"
                  href="https://www.linkedin.com/in/mike-wang-38294097/"
                  target="_blank"
                >
                  <p>Min Wang</p>
                  <img
                    className="profile-picture"
                    src="https://i.imgur.com/Y9ZYHhe.jpg"
                  />
                </a>
              </li>
              <li id="third-creator">
                <a
                  className="creator-links"
                  href="https://www.linkedin.com/in/anug-saha-5bb43613a/"
                >
                  <p>Anug Saha</p>
                  <img
                    className="profile-picture"
                    src="https://i.imgur.com/lxcoG3J.jpg"
                    target="_blank"
                  />
                </a>
              </li>
              <li id="fourth-creator">
                <a
                  className="creator-links"
                  href="https://www.linkedin.com/in/collin-winner-791203176/"
                >
                  <p>Collin Winner</p>
                  <img
                    className="profile-picture"
                    src="https://i.imgur.com/2b588fv.jpg"
                  />
                </a>
              </li>
            </div>
          </div>
        </footer>
        <img className="parallax-background"></img>
      </div>

      // </div>
      // </div>
    );
  }
}

export default Splash;
