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
    version: { type: String },
    created: { type: Date }, // 创建时间
    updated: { type: Date }, // 更新时间
  });

  return mongoose.model('AppModelHistory', appSchema, 'appmodelhistory');
};
