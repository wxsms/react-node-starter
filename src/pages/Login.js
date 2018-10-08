import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Form, Icon, Input, Button, message} from 'antd';

const FormItem = Form.Item;

class Login extends React.PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/api/auth/login', {
          username: values.username,
          password: values.password
        })
          .then(res => {
            window.location.href = '/';
          })
          .catch(err => {
            if (err.response.status === 401) {
              message.error('Login failed: user not exist or password incorrect.');
            } else {
              message.error('Login failed');
            }
          });
      }
    });
  };

  render () {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1>Login</h1>
        <FormItem>
          {
            getFieldDecorator('username', {
              rules: [
                {required: true, message: 'Please input your username!'},
                {type: 'email', message: 'The input is not valid E-mail!'}
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="Username"
              />
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(
              <Input
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                placeholder="Password"
              />
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to={'/register'}>sign up now!</Link>
        </FormItem>
      </Form>
    );
  }
}

const WrappedForm = Form.create()(Login);

export default WrappedForm;