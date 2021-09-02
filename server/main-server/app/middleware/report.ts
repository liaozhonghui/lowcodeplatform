export default () => {
  return async function (ctx, next) {
    ctx.logger.info('ctx.query:' + JSON.stringify(ctx.query || {}, null, 2));
    ctx.logger.info('ctx.request.body:' + JSON.stringify(ctx.request.body || {}, null, 2));
    const startTime = Date.now();
    await next();
    let diffTime = Date.now() - startTime;
    ctx.logger.info(`${ctx.url} reponseTime:${diffTime} `);
    ctx.logger.info('response body:', JSON.stringify(ctx.body));
    ctx.set('responseTime', diffTime + 'ms');
  };
};
