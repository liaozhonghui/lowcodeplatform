import http from '../libs/http';

// 获取登录用户信息
export const listApps = async () => {
  // TODO 返回用户权限模块
  //http.get('/api/user/id', query)
  let res = await http.get('/appCenter/list');
  return res;
};
