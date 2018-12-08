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


export async function assginRoleToApp(roleId, appId, optional){
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

export async function getOneRoleForApp(appId, match){
  let appRole = await AppRole.findOne({app: appId})
  .populate('role',['name', 'isDefault'], "Role", match);
  return appRole? appRole.role : null;
}

export async function createRoleForApp(params, appId){
  let role = await Role.findOne({name: params.name, app: appId});
  if(role){
    return "ROLE EXSIST IN SAME APP";
  }
  role = new Role({
    ...params
  });
  let appRole = new AppRole({
    role: role._id,
    app: appId
  })
  await role.save();
  await appRole.save();
  return role;
}

export async function setDefaultRolesForApp(appId){
  //默认的角色还包括nobody游客，loginedUser登录游客
  let nobody = await getOneRoleForApp(appId, {name: 'nobody'});
  if(!nobody){
    nobody = createRoleForApp({name: "nobody", isDefault: true}, appId);
  };

  let loginedUser = await getOneRoleForApp(appId, {name: 'loginedUser'})
  if(!loginedUser){
    loginedUser = createRoleForApp({name: 'loginedUser', isDefault: true}, appId);
  }
  
  return {nobody, loginedUser};
 

}

export default  AppRole;