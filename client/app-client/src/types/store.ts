// 全局状态管理
export interface State {
  app: AppState;
  admin: AdminState;
}

// 系统状态管
export interface AdminState {
  routers: Array<any>,
  dynamicRoutes: Array<any>,
  isLoadRule: boolean,
  userInfo: UserInfo,
}

// 应用状态
export interface AppState {
  sidebar: {
    opened: boolean;
  };
}

// 用户信息
export interface UserInfo {
  name: string,
  modules: Array<string>,
  email?: string,
}
