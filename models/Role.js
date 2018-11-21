var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const RoleSchema = new mongoose.Schema({
    name:  {
        type: String,
        index: true,
        unique: true
      },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    allowPaths: Object,
    isSuper: Boolean,
  });

  const Role = mongoose.model('Role', RoleSchema);

  export default  Role;