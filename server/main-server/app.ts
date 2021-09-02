import initShell from "./shell/init";

export default app => {
  app.beforeStart(async () => {
    const config = {
      modelInit: true
    };
    try {
      initShell(app).main(config);
      console.log('======> [stop]: app.beforeStart.');
    } catch (e) {
      console.error();
    }
  });
};
