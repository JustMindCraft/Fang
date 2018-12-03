var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppRoleSchema = new mongoose.Schema({
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const AppRole = mongoose.model('AppRole', AppRoleSchema);

export default  AppRole;