import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/appCenter/list', controller.appCenter.list);
  router.post('/appCenter/bulkCreate', controller.appCenter.bulkCreate);
};
