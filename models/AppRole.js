import Role from './Role';
import defaultFields from '../config/defaultFields';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppRoleSchema = new mongoose.Schema({
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    isDefault: Boolean,
    ...defaultFields,
  });

const AppRole = mongoose.model('AppRole', AppRoleSchema);


export async function assginRoleToApp(roleId="unknown", appId="unknown", optional={}){
  let appRole = await AppRole.findOne({role: roleId, app: appId});
  if(appRole){
    return "ALREADY EXISTS"
  }
  appRole = new AppRole({
    app: appId,
    role: roleId,
    isDefault: optional? optional.isDefault : false
  })
  await appRole.save()
  return appRole;
  
}

export async function getOneRoleForApp(appId="unknown", match={}){
  let appRole = await AppRole.findOne({app: appId})
  .populate('role',['name', 'isDefault'], "Role", match);
  return appRole? appRole.role : null;
}


export default  AppRole;