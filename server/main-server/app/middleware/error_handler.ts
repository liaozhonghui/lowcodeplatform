import { isError } from "lodash";

// error handler: capture system errors
export default (_option, _app) => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.app.emit('error', err, ctx);
      const status = err.status || 500;
      const error = err.message;
      ctx.body = {
        code: status,
        msg: error,
        err: err.stack || ''
      };
      ctx.logger.error(isError(err) ? err.stack : error);
      ctx.status = 200;
    }
  };
};
