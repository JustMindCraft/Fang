var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const RoleSchema = new mongoose.Schema({
    name:  String,
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isSuper: Boolean,
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    createdAt: { type: Date, default: Date.now },
  });

  const Role = mongoose.model('Role', RoleSchema);

  export default  Role;