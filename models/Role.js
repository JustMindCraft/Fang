import defaultFields from '../config/defaultFields';
import AppRole, { getOneRoleForApp } from './AppRole';
import assert from 'assert';

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


export async function isRoleIdExists(roleId){
    const role = await Role.findOne({_id: roleId, isDeleted: false});
    if(role){
        return true;
    }
    return false;
}

export async function createRole(params={}, appId=null){
    if(!params.name){
        assert.fail('应用名称params.name必需传入，检查App#createRole参数')
        return false;
    }
    if(!appId){
        assert.fail('应用名称appId必需传入，检查App#createRole参数')
        return false;
    }
    let role = await getOneRoleForApp(appId, {name: params.name});
    if(role){
        return "role_name_exists"
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


export async function createDefaultRolesForApp(appId=null, type="shop"){
    try {
        await createRole({
            name: 'nobody',
            name_zh: "游客",
            isDefault: true,
        }, appId);
        await createRole({
            name: 'registeredUser',
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
        console.error(error);
        
        assert.fail(error)
        
    }
   
}



export default  Role;