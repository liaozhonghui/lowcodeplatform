module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const projectGroupSchema = new Schema({

  });

  return mongoose.model('ProjectGroup', projectGroupSchema, 'projectgroup');
};
