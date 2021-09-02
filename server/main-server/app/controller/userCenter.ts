import { Controller } from "egg";
import { isEmpty } from 'lodash';

export default class UserController extends Controller {
  async login() {
    const { ctx, service } = this;
    let { email, password } = ctx.request.body;
    if (isEmpty(email)) ctx.throw(600, '请输入邮箱.');
    if (isEmpty(password)) ctx.throw(600, '请输入密码.');

    const res = await service.userCenter.login(email, password);
    ctx.helper.success({ ctx, res });
  }

  async list() {
    const { ctx, service } = this;
    const res = await service.userCenter.list();
    ctx.helper.success({ ctx, res });
  }
}
