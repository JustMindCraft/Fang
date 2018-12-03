var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const RoleUserSchema = new mongoose.Schema({
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const RoleUser = mongoose.model('RoleUser', RoleUserSchema);

export default  RoleUser;