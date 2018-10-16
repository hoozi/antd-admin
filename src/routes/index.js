import React from 'react';
import dynamic from 'dva/dynamic';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import { Spin } from 'antd';
import Layout from '@l/Layout';
import LoginPage from '@p/User/Login';
import { getToken } from '@u/token';

const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size='large' />
});

export default function RouterConfig({ history, app }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          path='/user/login'
          render={props => getToken() ? <Redirect to='/'/> : <LoginPage {...props}/>}
        />
        <Route
          path="/"
          render={props => getToken() ? <Layout {...props} /> : <Redirect to='/user/login'/>}
        />
      </Switch>
    </ConnectedRouter>
  );
}


