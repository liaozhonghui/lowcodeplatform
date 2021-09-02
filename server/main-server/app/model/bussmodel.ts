module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const bussModelSchema = new Schema({
    status: { type: Number },
  });
  return mongoose.model('BussModel', bussModelSchema, 'bussmodel');
};
