var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppUserSchema = new mongoose.Schema({
    good: { type: Schema.Types.ObjectId, ref: 'Good' },
    roles: { type: Schema.Types.ObjectId, ref: 'Role' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const AppUser = mongoose.model('AppUser', AppUserSchema);

export default  AppUser;