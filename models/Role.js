var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const RoleSchema = new mongoose.Schema({
    name:  String, //同一个app内不可重名
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isSuper: Boolean,
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    isDefault: Boolean,
    createdAt: { type: Date, default: Date.now },
    isSystemAdmin: Boolean, 
    //是否是后台管理角色，由于采用了动态角色来实现功能，用户在操作的过程中容易产生大量的角色，而系统角色会关系权限表，需要单独管理。
  });

  const Role = mongoose.model('Role', RoleSchema);

  export default  Role;