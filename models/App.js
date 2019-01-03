
import defaultFields from '../config/defaultFields';
import seed from '../config/seed';
import { isUserIdExists, getSuperAdmin } from './User';
import { createShop } from './Shop';
import { makeUserOwnApp, getOwner, appOwnerIsMatch, updateOwnerForApp } from './AppOwner';
import { makeUserBelongApp } from './AppUser';
import { createDefaultRolesForApp } from './Role';
import assert from 'assert';
import { assignUserForRole } from './RoleUser';
import { getOneRoleForApp } from './AppRole';

var mongoose = require('mongoose');
const AppSchema = new mongoose.Schema({
    secret: String,
    masterSecret: String,
    name:  {
        type: String,
        index: true,
        unique: true,
        default: require('uuid/v1')()+"_nonameApp"
    },
    name_zh:   {
        type: String,
        default: ""
    },
    type: {type: String, default: "shop"},
    host: {type: String, default: "localhost:3000"}, //主机名
    isDefault: {type: String, default: false},
    adminHost: {type: String, default: "localhost:3002"},//管理后台的主机
    smsServiceSecret: {type: String, default: "11bd70b637fe474bcb617e691a5fba3d"},
    smsServiceUrl: {type: String, default: "https://sms.yunpian.com/v2/sms/single_send.json"},
    ...defaultFields
});

const App = mongoose.model('App', AppSchema);

export async function isAppNameExists(name){
    const app = await App.findOne({name, isDeleted: false})
    if(app){
        return true;
    }
    return false;
}

export async function isAppIdExists(appId){
    const app = await App.findOne({_id: appId, isDeleted: false});
    if(app){
        return true;
    }
    return false;
}


export async function createApp(params={}, ownerId=null, type="shop"){
    
    if(!params.name){
       assert.fail("应用名称params.name必需传入，检查App#createApp传入参数")
    }
    if(!type){
        assert.fail("应用类型type必需传入，检查App#createApp传入参数")
    }
    if(await isAppNameExists(params.name)){
        
        return "app_name_already_exists";
    }

    if(!(await isUserIdExists(ownerId))){
        return "owner_is_not_an_effective_user";
    }
    const app = new App({
        ...params,
        secret: require('uuid/v1')(),
        masterSecret: require('uuid/v1')(),
        type,
    })
   
    try {
        
        switch (type) {
            case "shop":
                app.type = "shop";
                await app.save();
                await createShop({
                    name: app.name+"商城",
                    isDefault: true,
                }, app._id, ownerId);
                
                break;
        
            default:
                app.type = "shop";
                await app.save();
                await createShop({
                    name: app.name+"商城",
                    isDefault: true,
                }, app._id, ownerId);
                
                break;
        }
        await makeUserOwnApp(ownerId, app._id);
        await makeUserBelongApp(ownerId, app._id);
        await createDefaultRolesForApp(app._id, type);
        let role = getOneRoleForApp(app.id, {name: 'registerdUser'});
        await assignUserForRole(ownerId, role._id);
        if(type === 'shop'){
            role = getOneRoleForApp(app.id, {name: 'shopAdmin'});
            await assignUserForRole(ownerId, role._id);
        }
        if(type === 'storage'){
            role = getOneRoleForApp(app.id, {name: 'storageAdmin'});
            await assignUserForRole(ownerId, role._id);
        }
        
        return true;
        
    } catch (error) {
        console.error(error);
        
        assert.fail(error);
    }



}

async function updateOneApp(params, appId){
    if(!(await isAppIdExists(appId))){
        return 'appId_is_not_an_effictive_app';
    }
    if(params.type){
        return 'it_is_not_allowed_to_update_app_type';
    }
    try {
        const rlt = await App.updateOne({_id: appId},{
            $set: {
                ...params
            }
        })
        return rlt;
        
    } catch (error) {
        assert(error);
        return false;
    }
}



//=======================初始化应用方法============================
async function isDefaultAppExists(){
    const app = await App.findOne({isDefault: true, isDeleted: false});
    if(app)
    {
        return true;
    }
    return false;
}
async function isDefaultAppFitConfig(){
    const app = await App.findOne({...seed.defaultApp, isDefault: true, isDeleted: false});
    if(app){
        return true;
    }
    return false;
}

export async function getDefaultApp(){
    try {
        const app = await App.findOne({isDefault: true, isDeleted: false});
        // console.log(app);
        
        if(app)
        {
            return app;
        }
        return false;
    } catch (error) {
        console.error(error);
        assert.fail(error)
        
    }
   
    
}

export async function initDefaultApp(){
    const superAdmin = await getSuperAdmin();
    const isExist = await isDefaultAppExists();
    
    if(!isExist){
        
        try {
            await createApp({...seed.defaultApp, isDefault: true, isDeleted: false}, superAdmin._id, 'shop');
            
        } catch (error) {
            console.error(error);
            
            assert.fail(error);
        }
    }

    const fitConfig = await isDefaultAppFitConfig();
    if(!fitConfig){
        console.log("seed已经更改，更新默认应用信息");
        
        const app = await getDefaultApp();
        
        try {
            await updateOneApp({
                ...seed.defaultApp,
                isDefault: true,
                isDeleted: false,
            }, app._id );
        } catch (error) {
            console.error(error);
            
            assert.fail(error);
        }
    }
    try {
        const defaultApp = await getDefaultApp();
        const owner = await getOwner(defaultApp._id);
        if(!owner){
            return await makeUserOwnApp(owner._id, defaultApp._id);
        }else{
            const match = await appOwnerIsMatch(defaultApp._id, owner._id);
            if(!match){
                return await updateOwnerForApp(defaultApp._id, owner._id);
            }else{
                return true;
            }
        }
       
    } catch (error) {
        assert(error);
    }
   
   
}

//=========================初始化应用方法=======================

export default  App;