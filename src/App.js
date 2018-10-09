import React, {PureComponent} from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import {renderIf} from './utils/commonUtils';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import {Layout, Menu, Icon, Spin} from 'antd';
import * as actions from './redux/actions';

const SubMenu = Menu.SubMenu;
const {Header, Content, Footer} = Layout;

class App extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      selectedKeys: []
    };
  }

  correctSelectedMenu = () => {
    const path = this.props.location.pathname;
    if (path === '/') {
      this.setState({selectedKeys: ['/']});
    } else {
      try {
        this.setState({selectedKeys: ['/' + path.split('/')[1]]});
      } catch (e) {
        console.error(e);
      }
    }
  };

  componentDidMount = () => {
    this.correctSelectedMenu();
    this.props.actions.fetchUser();
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const prePath = prevProps.location.pathname;
    const path = this.props.location.pathname;
    if (prePath !== path) {
      this.correctSelectedMenu();
    }
  };

  onLogout = () => {
    axios.post('/api/auth/logout')
      .then(res => {
        window.location.href = '/';
      });
  };

  render () {
    const loading = this.props.user.get('loading');
    const user = this.props.user.get('user');
    const username = this.props.user.getIn(['user', 'username'], '');

    if (loading) {
      return (
        <div className={'loading-container'}>
          <Spin size="large"/>
        </div>
      );
    }

    return (
      <Layout className="layout">
        <Header>
          <div className="logo"/>
          <Menu theme="dark" mode="horizontal" selectedKeys={this.state.selectedKeys}
                style={{lineHeight: '64px'}}>
            <Menu.Item key="/">
              <Link to={'/'}>Home</Link>
            </Menu.Item>
            {
              renderIf(user)(
                <SubMenu
                  style={{float: 'right'}}
                  title={(
                    <span>
                      <span>Welcome, {username}&nbsp;</span>
                      <Icon type="caret-down" theme="outlined"/>
                    </span>
                  )}
                >
                  <Menu.Item key="/logout">
                    <a role={'button'} onClick={this.onLogout}>Logout</a>
                  </Menu.Item>
                </SubMenu>
              )
            }
            {
              renderIf(!user)(
                <Menu.Item key="/login" style={{float: 'right'}}>
                  <Link to={'/login'}>Login</Link>
                </Menu.Item>
              )
            }
          </Menu>
        </Header>
        <Content style={{padding: '0 50px'}}>
          <div style={{background: '#fff', padding: 24, minHeight: 280, marginTop: 50}}>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          React Node Starter
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const {user} = state;
  return {user};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
