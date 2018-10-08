import React, {PureComponent} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import {renderIf} from './utils/commonUtils';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';

export default class App extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      user: null,
      loadingUser: true
    };
  }

  componentWillMount = () => {
    axios.post('/api/auth/current')
      .then(res => {
        const user = res.data;
        window._user = user;
        this.setState({user, loadingUser: false});
      });
  };

  onLogout = () => {
    axios.post('/api/auth/logout')
      .then(res => {
        window.location.href = '/';
      });
  };

  render () {
    if (this.state.loadingUser) {
      return <p>loading...</p>;
    }

    return (
      <Router>
        <div className={'pageWrapper'}>
          <nav className="navbar navbar-default pageHeader">
            <div className="container-fluid">
              <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
                </ul>
              {
                renderIf(this.state.user)(
                  <ul className="nav navbar-nav navbar-right">
                    <p className="navbar-text">Signed in as {this.state.user && this.state.user.username}</p>
                    <li><a role={'button'} onClick={this.onLogout}>Logout</a></li>
                  </ul>
                )
              }
              {
                renderIf(!this.state.user)(
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/login">Login</Link></li>
                  </ul>
                )
              }
            </div>
          </nav>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </div>
          <div className="pageFooter">
            <h5>Footer</h5>
          </div>
        </div>
      </Router>
    );
  }
}