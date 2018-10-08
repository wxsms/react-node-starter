import React, {PureComponent} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

export default class Login extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onUsernameChange = (event) => {
    this.setState({username: event.target.value});
  };

  onPasswordChange = (event) => {
    this.setState({password: event.target.value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/auth/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        window.location.href = '/';
      })
      .catch(err => {
        if (err.response.status === 401) {
          alert('Login failed: user not exist or password incorrect.');
        } else {
          alert('Login failed.');
        }
      });
  };

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <form onSubmit={this.handleSubmit} style={{maxWidth: 400, margin: '0 auto'}}>
              <h1>Login</h1>
              <br/>
              <div className="form-group">
                <label htmlFor="inputEmail1">Email address</label>
                <input type="email" className="form-control" id="inputEmail1" placeholder="Email"
                       value={this.state.username} onChange={this.onUsernameChange} required/>
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword1">Password</label>
                <input type="password" className="form-control" id="inputPassword1" placeholder="Password"
                       value={this.state.password} onChange={this.onPasswordChange} required/>
              </div>
              <div className={'text-center'}>
                <button type="submit" className="btn btn-primary">Login</button>
                <span>&nbsp;or&nbsp;</span>
                <Link to="/register" className="btn btn-default">Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}