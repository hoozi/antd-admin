import React, { PureComponent } from 'react';
import styles from './Login.module.scss';
import { Row, Col, Input, Icon, Form, Button } from 'antd';
import { connect } from 'dva'

const FormItem = Form.Item;

const inputMap = [
  {
    name: 'username',
    props: {
      size: 'large',
      placeholder: '用户名',
      prefix: <Icon type='user' theme='outlined' style={{ color: 'rgba(0,0,0,.25)' }}/>
    },
    options: {
      initialValue: 'admin',
      rules: [
        { required: true, message: '请输入用户名' }
      ]
    }
  },
  {
    name: 'password',
    props: {
      size: 'large',
      placeholder: '密码',
      type: 'password',
      prefix: <Icon type='lock' theme='outlined' style={{ color: 'rgba(0,0,0,.25)' }}/>
    },
    options: {
      initialValue: '123456',
      rules: [
        { required: true, message: '请输入密码' }
      ]
    }
  },
  {
    name: 'code',
    props: {
      size: 'large',
      placeholder: '验证码',
      prefix: <Icon type='safety-certificate' theme='outlined' style={{ color: 'rgba(0,0,0,.25)' }}/>
    },
    options: {
      rules: [
        { required: true, message: '请输入验证码' }
      ]
    }
  }
]

@connect(({ loading }) => ({ submitting: loading.effects['user/login'] }))
@Form.create()
class LoginPage extends PureComponent {
  state = {
    randomStr: Date.now()
  }
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if(err) return;
      dispatch({
        type: 'user/login',
        payload: {
          ...values,
          username: 'admin',
          password: 'iXB7te2ViIqBT8IbW3y4fA==',
          randomStr: Date.now(),
          grant_type: 'password',
          scope: 'server'
        }
      });
    });
  }
  handleChangeCode = () => {
    this.setState({
      randomStr: Date.now()
    });
  }
  renderFormItem() {
    const { form: { getFieldDecorator } } = this.props;
    return inputMap.map(item => {
      let formItem;
      if(item.name === 'code') {
        formItem = (
          <FormItem key={item.name}>
            <Row gutter={8}>
              <Col span={16}>{getFieldDecorator(item.name, { ...item.options })(<Input {...item.props}/>)}</Col>
              <Col span={8}>
                <img 
                  src={`/code?randomStr=${this.state.randomStr}`} 
                  className={styles.codeImg} 
                  onClick={this.handleChangeCode}
                  alt='验证码' 
                />
              </Col>
            </Row>
          </FormItem>
        )
      } else {
        formItem = <FormItem key={item.name}>{getFieldDecorator(item.name, { ...item.options })(<Input {...item.props}/>)}</FormItem>
      }
      return formItem;
    });
  }
  render() {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <h1>优质服务，追求卓越</h1>
          <p>Quality service, The pursuit of excellence</p>
        </div>
        <Form
          onSubmit={this.handleSubmit}
          className={styles.loginArea}
        >
          { this.renderFormItem() }
          <Button 
            htmlType='submit'
            type='primary' 
            size='large' 
            className={styles.widthFull}
            loading={this.props.submitting}
          >
            登 录
          </Button>
        </Form>
      </div>
    )
  }
}

export default LoginPage;