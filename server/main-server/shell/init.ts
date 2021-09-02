/**
 * 1. add table data
 * 2. add table model
 */

import { EventEmitter } from "events";
import { isNil } from "lodash";
import { pswdEncode } from '../app/util';
class InitShell extends EventEmitter {
  private app: any;
  constructor(app) {
    super();
    this.app = app;
  }
  hasApp() {
    return isNil(this.app);
  }
  async dbinit(model) {
    const { User } = model;
    const usercount = await User.count();
    if (usercount == 0) {
      const userInst = new User();
      userInst.email = 'admin@talefun.com';
      userInst.password = pswdEncode('123456qwer');
      userInst.name = 'admin';
      userInst.role = '超级管理员';
      userInst.module = ['用户管理', '应用管理'];
      userInst.group = '超级管理员';
      userInst.status = 0;
      userInst.created = new Date();
      userInst.updated = userInst.created;
      return await userInst.save();
    }
  }

  async main(config) {
    if (!this.hasApp) return;
    const app = this.app;
    const modelInit = config.modelInit && true;
    if (!modelInit) return;
    const dbinit = this.dbinit;
    await dbinit(app.model);
    return;
  }
}

export default (app) => new InitShell(app);
