interface Settings {
  wxLogin: boolean,
  title: string,
  serverError: boolean,
}

const settings: Settings = {
  wxLogin: false,              // 是否开启微信登录
  title: '后台管理系统',       // 系统标题
  serverError: false,         // 是否使用服务器返回错误
};

export default settings;
