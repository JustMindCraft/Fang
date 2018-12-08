
import AppOwner from './AppOwner';
import { setDefaultRolesForApp } from './AppRole';
import defaultFields from '../config/defaultFields';

var mongoose = require('mongoose');
const AppSchema = new mongoose.Schema({
    secret: String,
    masterSecret: String,
    name:  {
        type: String,
        index: true,
        unique: true,
        default: require('uuid/v1')()+"_defaultApp"
    },
    name_zh:   {
        type: String,
        unique: true,
        default: "默认应用"
    },
    type: {type: String, default: "shop"},
    hosts: {type: String, default: "localhost:3000"}, //主机名
    isDefault: Boolean,
    adminHosts: {type: String, default: "localhost:3002"},//管理后台的主机
    smsServiceSecret: String,
    smsServiceUrl: String,
    ...defaultFields
});

const App = mongoose.model('App', AppSchema);

export async function createApp(appParams={}, ownerId=null, type="shop"){
    // 一个APP的建立必要传入拥有者，app类型, 数据创建类型，第一个参数和关系无关，而之后每个都必须和关系有关
    if(!appParams.name){
        return "name required"; 
    }
    if(!appParams.name_zh){
        return "name_zh required";
    }

    if(!ownerId){
        return "ownerId required";
    }
    if(!type){
        return "type required";
    }
    let app = await App.findOne({name: appParams.name, name_zh: appParams.name_zh, isDeleted: false})
    if(!app){
        app = new App({
            ...appParams,
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
                await setDefaultRolesForApp(app._id);
                return app;
            
            case "storage":
                app.type = "storage";
                await app.save();
                await setDefaultRolesForApp(app._id);
                return app;
        
            default:
                await app.save();
                await setDefaultRolesForApp(app._id);
                return app;
        }
    } catch (error) {
        console.log(error);
        return "SOMETHING WRONG";
        
    }

    

}


export async function getDefaultApp(){
    let app =  await App.findOne({isDefault: true, isDeleted: false});
    if(!app){
        return "default app notfound"
    }
    return app;
}

export default  App;