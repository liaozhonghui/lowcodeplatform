import { Service } from "egg";
import { pswdEncode } from "../util";
import { isEmpty, omit } from 'lodash';
import { ERRORCODE } from "../util/constants";
export default class UserService extends Service {
  async login(email, password) {
    const { ctx } = this;
    const { User } = ctx.model;
    let userInst: any = await User.findOne({ email }).lean();
    if (isEmpty(userInst)) ctx.throw(ERRORCODE.dbDataValidateError, '用户不存在.');
    let oldPassword = userInst.password;
    if (oldPassword != pswdEncode(password)) ctx.throw(ERRORCODE.dbDataValidateError, '用户密码错误.');

    const token = await this.service.actionToken.createToken(userInst._id);
    userInst.token = token;
    return omit(userInst, 'password');
  }
  async list() {
    // TODO: 增加用户权限校验
    const { ctx } = this;
    const { User } = ctx.model;
    const users = await User.find();
    return users;
  }
}
