import React, { Component } from 'react';
import { 

} from 'antd';
import { Switch, Route, Redirect } from 'dva/router';
import { connect } from 'dva';

@connect(({ user }) => ({ user }))
class Layout extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'user/getUserMenu'
    })
  }
  render() {
    return <h1>Layout</h1>
  }
}

export default Layout;

