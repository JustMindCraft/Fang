var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const RoleSchema = new mongoose.Schema({
    name:  String, //同一个app内不可重名
    isSuper: Boolean,
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    isDefault: Boolean,
    createdAt: { type: Date, default: Date.now },
    isSystemAdmin: Boolean, 
    //是否是后台管理角色，由于采用了动态角色来实现功能，用户在操作的过程中容易产生大量的角色，而系统角色会关系权限表，需要单独管理。
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Role = mongoose.model('Role', RoleSchema);


export async function createRole(roleParams, app){
    
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

export async function setDefaultRoles(app){
  //默认的角色还包括nobody游客，loginedUser登录游客
  let nobody = await Role.findOne({isDefault: true, name: "nobody", app})
  if(!nobody){
      nobody = new Role({
          name:  "nobody", //同一个app内不可重名
          name_zh: "游客",
          users: [],
          isSuper: false,
          app,
          isDefault: true,
          createdAt: new Date(),
          isSystemAdmin: false, 
          //是否是后台管理角色，由于采用了动态角色来实现功能，用户在操作的过程中容易产生大量的角色，而系统角色会关系权限表，需要单独管理。
      })
      await nobody.save();
  }
  let loginedUser = await  Role.findOne({isDefault: true, name: "loginedUser", app});
  if(!loginedUser){
      loginedUser = new Role({
          name:  "loginedUser", //同一个app内不可重名
          name_zh: "登录用户", 
          users: [],
          isSuper: false,
          app,
          isDefault: true,
          createdAt: new Date(),
          isSystemAdmin: false, 
          //是否是后台管理角色，由于采用了动态角色来实现功能，用户在操作的过程中容易产生大量的角色，而系统角色会关系权限表，需要单独管理。
      })
      await loginedUser.save();
  }

  return {nobody, loginedUser}

}

export default  Role;