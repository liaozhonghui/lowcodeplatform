import { Controller } from 'egg';
import { range, map } from 'lodash';

export default class AppCenterController extends Controller {
  async list() {
    const { ctx } = this;
    const { Appmodel } = ctx.model;

    const apps = await Appmodel.find();
    ctx.helper.success({ ctx, res: apps });
  }
  async bulkCreate() {
    const { ctx } = this;
    const { Appmodel } = ctx.model;
    let res = map(range(0, 10, 1), (v) => {
      return {
        appname: '应用' + v,
        order: v
      };
    });
    await Appmodel.create(res);
    ctx.helper.success({ ctx, res: res });
  }
}
