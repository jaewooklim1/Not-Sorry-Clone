import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../styling/login_signup.scss';

class LoginForm extends React.Component{ 
    constructor(props){ 
        super(props); 

        this.state= { 
            username: '', 
            password: '', 
            errors: {}
        }; 

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.demoUserLogin= this.demoUserLogin.bind(this);
    }

    // Once the user has been authenticated, redirect to the Rooms page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/rooms');
    }
    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(user); 
  }

  demoUserLogin(e){ 
    e.preventDefault(); 
    const demoUser = { 
      username: "DemoUser",
      password: "123456"
    }

    this.props.login(demoUser)
  }

  renderErrors() {
    return(
      <ul className='errors'>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <img className="nav-sorry-logo-transparent" src="https://i.imgur.com/DlHwK47.png"/>
          <div className="form-navbar">    
            <div className="input-form">  
              <div className="input-login-text">Login</div>
              <i className="input-icon">
                
              </i>  
              <input type="text"
                className="input-username"
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="Username"
              />            
            <br/>
              <input type="password"
                className="input-password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
            <br/>
            <input type="submit" value="Submit" className="input-submit"/>
            <div className="input-errors">
              {this.renderErrors()}
            </div>
            <button className='demo-user-btn' onClick={this.demoUserLogin}>
              Demo Login
            </button>
            <div className="sign-up-nav-ctn">
              <span>Not a member? {this.props.navLink} </span>
            </div>
            </div> 

          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
