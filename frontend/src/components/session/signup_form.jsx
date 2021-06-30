import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component{ 
    constructor(props){ 
        super(props); 
        this.state = {
            username: '',
            password: '', 
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
          this.props.history.push('/login');
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
    
        this.props.signup(user, this.props.history); 
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

    render(){ 
        return ( 
            <div className="form-container">
            <form onSubmit={this.handleSubmit}>
            <img className="nav-sorry-logo-transparent" src="https://i.imgur.com/DlHwK47.png"/>
              <div className="form-navbar">
              <div className="input-form">  
              <div className="input-login-text-signup">Signup</div>
                <br/>
                  <input type="text"
                    value={this.state.username}
                    className="input-username"
                    onChange={this.update('username')}
                    placeholder="Username"
                  />
                <br/>
                  <input type="password"
                    value={this.state.password}
                    className="input-password"
                    onChange={this.update('password')}
                    placeholder="Password"
                  />
                <br/>
                <input type="submit" value="Submit" className="input-submit" />
                {this.renderErrors()}
                <div className="login-nav-ctn">
                  <span>Already member? {this.props.navLink} </span>
                </div>
                </div>
              </div>
            </form>
          </div>

        )
    }
}

export default withRouter(SignupForm);