import React, {PureComponent} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Form, Icon, Input, Button, message} from 'antd';

const FormItem = Form.Item;

class Register extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      confirmDirty: false,
      redirectToLogin: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/api/auth/register', {
          username: values.username,
          password: values.password
        })
          .then(res => {
            message.success('Sign up success.');
            this.setState({redirectToLogin: true});
          })
          .catch(err => {
            if (err.response.status === 406) {
              message.error('Sign up failed: user already exist.');
            } else {
              message.error('Sign up failed');
            }
          });
      }
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  render () {
    if (this.state.redirectToLogin) {
      return <Redirect to={'/login'}/>;
    }
    const {getFieldDecorator} = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1>Sign up</h1>
        <FormItem label="Username">
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
        <FormItem label="Password">
          {
            getFieldDecorator('password', {
              rules: [
                {required: true, message: 'Please input your Password!'},
                {validator: this.validateToNextPassword}
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                placeholder="Password"
              />
            )
          }
        </FormItem>
        <FormItem label="Confirm password">
          {
            getFieldDecorator('confirm', {
              rules: [
                {required: true, message: 'Please confirm your password!'},
                {validator: this.compareToFirstPassword}
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                placeholder="Confirm password"
                onBlur={this.handleConfirmBlur}
              />
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign up!
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedForm = Form.create()(Register);

export default WrappedForm;