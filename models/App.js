
import AppOwner from './AppOwner';
import defaultFields from '../config/defaultFields';
import { createDefaultRolesForApp } from './Role';
import seed from '../config/seed';

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
        unique: true,
        default: "未命名应用"
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
    let app = await App.findOne({name, isDeleted: false})
    if(app){
        return true;
    }
    return false;
}

export async function createApp(params={}, ownerId=null, type="shop"){
    // 一个APP的建立必要传入拥有者，app类型, 数据创建类型，第一个参数和关系无关，而之后每个都必须和关系有关
    //这个函数也必须生成默认的角色类型
    if(!params.name){
        return "name required"; 
    }

    if(!ownerId){
        return "ownerId required";
    }
    if(!type){
        return "type required";
    }
    let app = null;
    if(isAppNameExists(params.name)){
        app = new App({
            ...params,
            secret: require('uuid/v1')(),
            masterSecret: require('uuid/v1')(),
        });
    }else{
        return "APP_NAME_EXSIT";
    }
    

    let appOwner = await AppOwner.findOne({owner: ownerId, isDeleted: false});
    if (!appOwner) {
        appOwner = new AppOwner({
            app: app._id,
            owner: ownerId,
        })
    }else{
        appOwner.app = app._id;
    }
    try {
        await appOwner.save();
    
        switch (type) {
            case "shop":
                app.type = "shop";
                await app.save();
                await createDefaultRolesForApp(app._id, type);
                return app;
            
            case "storage":
                app.type = "storage";
                await app.save();
                await createDefaultRolesForApp(app._id, type);
                return app;
        
            default:
                await app.save();
                await createDefaultRolesForApp(app._id, type);
                return app;
        }
    } catch (error) {
        console.log(error);
        return "SOMETHING WRONG";
        
    }

    

}


export async function getDefaultApp(){
    const app =  await App.findOne({isDefault: true, isDeleted: false});
    if(!app){
        return "default app notfound"
    }
    return app;
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
    const app = await App.findOne({isDefault: true, isDeleted: false, name: seed.defaultApp.name});
    if(app){
        return true;
    }
    return false;
}

//=========================初始化应用方法=======================

export default  App;