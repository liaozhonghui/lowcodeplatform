import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { extend } from 'lodash';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1630464507817_8217';

  // add your egg config in here
  config.middleware = ['report', 'errorHandler'];
  config.security = extend(config.security, {
    csrf: { enable: false },
    domainWhiteList: ['*'],
  });
  config.cors = {
    origin: '*',
    exposeHeaders: ['freshToken', 'sessionToken'],
    credentials: false,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.static = {
    prefix: '/',
    dir: appInfo.baseDir + '/app/public',
    buffer: true
  };
  config.logger = {
    encoding: 'utf-8',
    level: 'INFO',
  };
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/lowcode-app',
      options: {}
    }
  };
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
