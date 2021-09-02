module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const appuserSchema = new Schema({
    appid: { type: String }, // 应用id
    appname: { type: String }, // 应用名称
    version: { type: String }, // 应用版本
    origin: { type: String }, // 地区
    deviceId: { type: String }, // 设备id
    ipaddr: { type: String }, // ip地址
    resolution: { type: String }, // 分辨率
    assess: { type: Array }, // 访问位置
    device: {
      os: { type: String }, // 操作系统
      brand: { type: String }, // 设备品牌
      position: {
        la: { type: Number }, // 维度
        lo: { type: Number }, // 经度
      }
    }
  });
  return mongoose.model('Appuser', appuserSchema, 'appuser');
};
