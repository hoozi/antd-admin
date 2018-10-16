import { 
  login,
  queryUserMenu,
  queryCurrentUser,
} from '@a/user';
import { setToken, getToken, removeToken } from '@u/token';
import { formatterMenus } from '@u';
import { routerRedux } from 'dva/router';
export default {
  namespace: 'user',
  state: {
    permissions: [],
    sysUser: {},
    userMenu: [],
    token: '',
  },
  effects: {
    *login({ payload }, { call, put }) {
      if(getToken()) {
        removeToken();
      }
      const response = yield call(login, payload);
      if(response && response.access_token) {
        yield put({
          type: 'saveToken',
          payload: {
            token: response.access_token
          }
        });
        yield put({
          type: 'getCurrentUser'
        })
        yield put({
          type: 'getUserMenu'
        });
        yield put(routerRedux.push('/'));
      }
    },
    *getUserMenu(_, { call, put }) {
      const response = yield call(queryUserMenu);
      if( response && response.code !== 0 ) return;
      yield put({
        type: 'saveUserMenu',
        payload: {
          userMenu: formatterMenus(response.data)
        }
      })
    },
    *getCurrentUser(_, { call, put }) {
      const response = yield queryCurrentUser();
      if(response && response.code !== 0) return;
      yield put({
        type: 'save',
        payload: response.data
      })
    }
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    saveUserMenu(state, { payload: { userMenu } }) {
      return {
        ...state,
        userMenu
      }
    },
    saveToken(state, {payload: { token }}) {
      setToken(token);
      return {
        ...state,
        token
      }
    }
  }
}