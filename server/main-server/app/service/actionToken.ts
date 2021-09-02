import { Service } from 'egg';
import { get } from 'lodash';

const SESSION_EXPIRES_TIME = 6 * 24 * 60 * 60;
const FRESH_EXPIRES_TIME = 24 * 60 * 60;

export default class ActionTokenSerivce extends Service {
  /**
   * id -> data(id) as b -> [Token(b), Token(b)]
   */
  async createToken(id) {
    const data = { _id: id };
    const sessionToken = this.sessionToken(data);
    const freshToken = this.freshToken(data);

    return { sessionToken, freshToken };
  }

  /**
   * a -> Token(a)
   */
  public sessionToken(data) {
    const { ctx } = this;
    return get(ctx.app, 'jwt').sign({
      data,
      expiresIn: SESSION_EXPIRES_TIME,
    }, ctx.app.config.jwt.secret);
  }
  /**
   * a -> Token(a)
   */
  public freshToken(data) {
    const { ctx } = this;
    return get(ctx.app, 'jwt').sign({
      data,
      expiresIn: FRESH_EXPIRES_TIME,
    }, ctx.app.config.jwt.secret);
  }
}
