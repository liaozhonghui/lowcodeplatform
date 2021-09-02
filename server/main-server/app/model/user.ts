module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    email: { type: String }, // 用户邮箱
    name: { type: String }, // 用户姓名
    password: { type: String }, // 用户密码
    role: { type: String }, // 用户角色
    module: { type: Array }, // 用户模块
    group: { type: Object }, // 用户组
    wxid: { type: String }, // 企业微信id
    status: { type: Number }, // 用户状态
    created: { type: Date }, // 创建时间
    updated: { type: Date },// 更新时间
  });
  return mongoose.model('User', userSchema, 'user');
};
