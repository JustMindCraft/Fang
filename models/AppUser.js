var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppUserSchema = new mongoose.Schema({
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const AppUser = mongoose.model('AppUser', AppUserSchema);

export default  AppUser;