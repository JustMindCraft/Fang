import Role, { isRoleIdExists } from './Role';
import { isUserIdExist } from './User';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const RoleUserSchema = new mongoose.Schema({
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });


const RoleUser = mongoose.model('RoleUser', RoleUserSchema);


export async function getRolesByUserId(userId, match){
  let userRoles = await RoleUser.find({user: userId}, ['role'])
  .populate('role', ['name'], Role, match)
  ;
  return userRoles;
}

export async function getOneRoleByUserId(userId, match){
  let userRole = await RoleUser.findOne({user: userId}, ['role'])
  .populate('role', ['name', 'app'], Role, match)
  ;
  return userRole.role;
}

export async function getOneRoleIdByUserId(userId, match){
  let userRole = await RoleUser.findOne({user: userId}, ['role'])
  .populate('role', ['_id'], Role, match)
  ;
  return userRole? userRole.role: null;
}

export async function matchRoleUser(userId, roleId){
  const userRole = await RoleUser.findOne({user: userId, role: roleId});
  if(userRole){
    return true;
  }
  return false;
}

export async function assignUserForRole(userId, roleId){
  if(!(await isUserIdExist(ownerId))){
    return "owner_is_not_an_effective_user";
  }
  if(!(await isRoleIdExists(roleId))){
    return 'roleId_is_not_an_effective_role';
  }
  const match = await matchRoleUser(userId, roleId);
  if(match){
    return "userId_is_already_relate_roleId";
  }
  const userRole = new RoleUser({
    user: userId, 
    role: roleId,
  });
  try {
    await userRole.save();
    return true;
    
  } catch (error) {
      assert.fail(error);
      return false;
  }
}

export default  RoleUser;