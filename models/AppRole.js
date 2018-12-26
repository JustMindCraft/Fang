import defaultFields from '../config/defaultFields';
import { isAppIdExists } from './App';
import { isRoleIdExists } from './Role';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppRoleSchema = new mongoose.Schema({
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    isDefault: Boolean,
    ...defaultFields,
  });

const AppRole = mongoose.model('AppRole', AppRoleSchema);


export async function assginRoleToApp(roleId=null, appId=null, isDefault=false){
  if(!(await isRoleIdExists(roleId))){
    return "roleId_is_not_an_effictive_role";
  }
  if(!(await isAppIdExists(appId))){
    return 'appId_is_not_an_effictive_app';
  }
  let appRole = await AppRole.findOne({role: roleId, app: appId});
  if(appRole){
    return "the_role_in_app_exist"
  }
  appRole = new AppRole({
    app: appId,
    role: roleId,
    isDefault
  })
  try {
    await appRole.save()
    return true;
  } catch (error) {
    assert.fail(error)
  }
  return false;
  
}

export async function getOneRoleForApp(appId=null, match={}){
  if(!(await isAppIdExists(appId))){
    return "appId_is_not_an_effictive_app";
  }
  let appRole = await AppRole.findOne({app: appId})
  .populate('role',['_id', 'name', 'isDefault'], "Role", match);
  return appRole? appRole.role : null;
}


export default  AppRole;