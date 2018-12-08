import defaultFields from '../config/defaultFields';
import AppRole, { getOneRoleForApp } from './AppRole';

var mongoose = require('mongoose');
const RoleSchema = new mongoose.Schema({
    name:  {type: String, default: require('uuid/v1')()+"_defaultApp"}, //同一个app内不可重名
    name_zh: String,
    isSuper: {type: Boolean, default: false},
    isDefault: {type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
    isSystemAdmin: {type: Boolean, default: false}, 
    //是否是后台管理角色，由于采用了动态角色来实现功能，用户在操作的过程中容易产生大量的角色，而系统角色会关系权限表，需要单独管理。
    ...defaultFields
});

const Role = mongoose.model('Role', RoleSchema);


export async function createRole(params={}, appId=null){
    if(!params.name){
        return 'name required';
    }
    if(!appId){
        return 'appId required'
    }
    let role = await getOneRoleForApp(appId, {name: params.name, name_zh: params.name_zh});
    if(role){
        return "role name or name_zh exists"
    }else{
        role = new Role({
            ...params
        })
        const appRole = new AppRole({
            app: appId,
            role: role._id,
        })
        await role.save();
        await appRole.save();
        return role;
        
    }
    
}

export async function newSuperRole(){
    try {
        const superRole = new Role({
            name: 'superAdmin',
            name_zh: "超级管理员",
            isDefault: true,// 任何设为isDefault的记录都是系统内置记录，都不可更改和删除
            isSuper: true,
          })
          
        return superRole;
        
    } catch (error) {
        return console.log(error);
        
    }
  
}

export async function newSuperRoleForApp(app){
  const superRole = newSuperRole();
  superRole.app = app;
  return superRole;
}


export async function createSuperRole(){
    const superRole = newSuperRole();
    await superRole.save();
    return superRole;
}

export async function createSuperRoleForApp(app){
  const superRole = newSuperRoleForApp(app);
  await superRole.save();
  return superRole;
}



export default  Role;