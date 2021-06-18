import React from "react";
import "../../styling/splash.scss";

import NavBar from "../nav/navbar";

class Splash extends React.Component {
  render() {
    return (
      <body className="whole-page">
        <NavBar></NavBar>
        <div className="greeting-line">Welcome to Sorry</div>
        {/* <div className="greeting-instructions">Instructions</div> */}
        <div id="page">
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
        </div>






        <div className="test-background"></div>
        <footer
          className="footer"
          style={{ position: "absolute", bottom: "-500px" }}
        >
          <div className="logo-background-row">
            
            <div className="logo-background-column">
              
            </div>
          </div>

          <div className="back-to-top" onClick={() => window.scrollTo(0, 0)}>
            Back to top
          </div>
          <div className="sub-bottom-footer">
            <div className="get-to-know-text">Get to Know the Creators</div>
            <div className="get-to-know">
              <li id="first-creator">
                <a
                  className="creator-links"
                  href="https://www.linkedin.com/in/jae-wook-lim-430553100/"
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
                  href="https://www.linkedin.com/in/jae-wook-lim-430553100/"
                >
                  <p>Min Wang</p>
                  <img
                    className="profile-picture"
                    src="https://i.imgur.com/2b588fv.jpg"
                  />
                </a>
              </li>
              <li id="third-creator">
                <a
                  className="creator-links"
                  href="https://www.linkedin.com/in/jae-wook-lim-430553100/"
                >
                  <p>Anug Saha</p>
                  <img
                    className="profile-picture"
                    src="https://i.imgur.com/lxcoG3J.jpg"
                  />
                </a>
              </li>
              <li id="fourth-creator">
                <a
                  className="creator-links"
                  href="https://www.linkedin.com/in/jae-wook-lim-430553100/"
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
      </body>

      // </div>
      // </div>
    );
  }
}

export default Splash;
