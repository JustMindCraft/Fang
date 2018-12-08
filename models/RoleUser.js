import Role from './Role';

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
  return userRole.role;
}

export default  RoleUser;