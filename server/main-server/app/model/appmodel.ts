module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const appSchema = new Schema({
    appid: { type: String }, // 应用id
    appname: { type: String }, // 应用名称
    order: { type: String }, // 应用排序
    group: { type: String }, // 群组
    owner: {
      name: { type: String }, // 拥有者
      email: { type: String }, // 邮箱
    }, // 拥有者
    members: { type: Array }, // 成员
    config: {
      origin: { type: String }, // 位置
    },
    version: { type: String }, // 版本
    status: { // 应用状态，未启动，运行中，error
      type: Number,
      default: 1
    },
    auth: {
      token: { type: String }, // 登录token,
      ca: { type: String }, // 证书
      options: { type: Object }, // 预留可选项,
      lastupdated: { type: Date }, // 最后更新时间
    }, // 认证
    active: { // 活跃数据统计信息， 用户数，日活，访问量，报错统计等
      usercount: { type: Number },
      dau: { type: Number }, // 日活
      mau: { type: Number },  // 月活
      pv: { type: Number }, // 访问量
      uv: { type: Number }, // 独立访客数
      lastUpdateDate: { type: Date }, // 最后更新日期
    },
    errorList: {
      type: Array, // 错误统计
    }
  });
  return mongoose.model('Appmodel', appSchema, 'appmodel');
};
