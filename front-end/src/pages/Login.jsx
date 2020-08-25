import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { login, signup } from '../store/actions/UserActions'
import { Link } from 'react-router-dom';


class _Login extends Component {


  state = {
    user: {
      email: '',
      password: '',
    },
    msg: ''
  }

  onHandelChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState(prevState => ({ user: { ...prevState.user, [field]: value } }));

  }


  onHandelSubmit = async (ev) => {
    ev.preventDefault();
    const userCreds = this.state.user;
    try {
      
      await this.props.login(userCreds);
      this.props.history.push('/');

    } catch (err) {
      this.setState(prevState => ({ user: { ...prevState.user, email: '', password: '' } }))
      this.setState({ msg: err.response.data.error });
    }

  }

  handleLogin = async (res, supplier) => {
    let user = {}
    if (supplier === 'facebook') {
      const {name, email, picture, id} = res
      user = {
        username: name,
        email,
        imgUrl: picture.data.url,
        password: id
    }
  }
    if (supplier === 'google') {
      const {name, email, imageUrl, googleId} = res.profileObj
      user = {
        username: name,
        email,
        imgUrl: imageUrl,
        password: googleId
     }
    }
    
      try {
        await this.props.signup(user);
        this.props.history.push('/');
    } catch (err) {
        console.log('Problem in login with supplier')
    }
  
 
  }
  
  render() {
    const responseFacebook = (response) => {
      this.handleLogin(response, 'facebook');
    }

    const responseGoogle = (response) => {
      this.handleLogin(response, 'google');
    }
    
    return (
      <div className="loginForm">
        <form onSubmit={this.onHandelSubmit}>
          <h1>Login</h1>

        
    
         
            <FacebookLogin
    appId="2615909622063165"
    fields="name,email,picture"
    onClick={this.handle}
    callback={responseFacebook}
    icon="fa-facebook"
    textButton="Continue with facebook"
    cssClass="continue-with-facebook"
     />
    
        

       
           
  
              <GoogleLogin
    clientId="426820236890-n3qrl4u3514kjph5o4mfscumqn96ijam.apps.googleusercontent.com"
    buttonText="Continue with Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    className="continue-with-google"
  />
         


          <div className="login-or"><span>OR</span></div>

          <input type="text" name="email" onChange={this.onHandelChange} className="login-input" placeholder="Email" />
          <input type="password" name="password" onChange={this.onHandelChange} className="login-input" placeholder="password" />
          <div className="form">
            <p style={{ color: "red", fontSize: "0.8rem" }}>{this.state.msg}</p>
            <button className="loginBtn">Continue</button>
            <div className="signup"><p>New member?</p> <Link to="/signup">Sign up</Link></div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.users.loggedInUser
  }
}

const mapDispatchToProps = {
  login,
  signup
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Login));