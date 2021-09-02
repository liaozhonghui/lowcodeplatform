import { has } from 'lodash';
import http from '../libs/http';
import store from '../store';

// 获取登录用户信息
export const getUserInfo = async (query: any) => {
  // TODO 返回用户权限模块
  //http.get('/api/user/id', query)
  const userInfo = {
    name: 'admin',
    modules: []
  };
  await store.dispatch('setUserInfo', userInfo);
  return userInfo.modules;
};

export const loginApi = async (data: any) => {
  let res = await http.post('/userCenter/login', data);
  if (has(res, 'data')) return res.data;
  return {};
};
