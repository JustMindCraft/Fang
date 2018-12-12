import defaultFields from '../config/defaultFields';
import AppRole, { getOneRoleForApp } from './AppRole';

var mongoose = require('mongoose');
const RoleSchema = new mongoose.Schema({
    name:  {type: String, default: require('uuid/v1')()+"_nonamerole"}, //同一个app内不可重名
    name_zh: String,
    isSuper: {type: Boolean, default: false},
    isDefault: {type: Boolean, default: false},
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


export async function createDefaultRolesForApp(appId="unknown", type="shop"){
    try {
        await createRole({
            name: 'nobody',
            name_zh: "游客",
            isDefault: true,
        }, appId);
        await createRole({
            name: 'loginedUser',
            name_zh: "登录用户",
            isDefault: true,
        }, appId);
        await createRole({
            name: 'admin',
            name_zh: '管理员',
            isDefault: false,
        }, appId)
        if(type === 'shop')
        {
            await createRole({
                name: 'shopAdmin',
                name_zh: '店铺管理员',
                isDefault: false,
            }, appId)
        }
        if(type === 'storage')
        {
            await createRole({
                name: 'storageAdmin',
                name_zh: '文件管理员',
                isDefault: false,
            }, appId)
        }
        return 1;
        
    } catch (error) {
        console.log(error);
        return 0;
        
    }
   
}

export async function createSuperRole(){
    try {
        const superRole = new Role({
            name: 'superAdmin',
            name_zh: "超级管理员",
            isDefault: true,// 任何设为isDefault的记录都是系统内置记录，都不可更改和删除
            isSuper: true,
          })
        await superRole.save();
        return superRole;
        
    } catch (error) {
        console.log(error);
        return 0;
        
    }
  
}



export default  Role;