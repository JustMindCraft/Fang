import { setSuperAdmin, createAdminForApp } from './User';
import config from '../config';
import { setDefaultAppGoodClass } from './GoodClass';

import { setDefaultCards } from './Good'; 

import { setDefaultShop } from './Shop';

import { setDefaultShelf } from './Shelf';
import { setDefaultRoles } from './Role';
import AppOwner from './AppOwner';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppSchema = new mongoose.Schema({
    secret: String,
    masterSecret: String,
    name:  {
        type: String,
        index: true,
        unique: true
    },
    name_zh:  {
        type: String,
        index: true,
        unique: true
    },
    type: String,
    hosts: [{type: String}], //主机名
    isDefault: Boolean,
    adminHosts: [{type: String}],//管理后台的主机
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const App = mongoose.model('App', AppSchema);

export async function createApp(appParams, ownerId, type){
    // 一个APP的建立必要传入拥有者，app类型, 数据创建类型，第一个参数和关系无关，而之后每个都必须和关系有关
    if(!ownerId){
        return {
            msg: "OWNERID_REQUIRED"
        }
    }
    if(!type){
        return {
            msg: "TYPE_REQUIRED"
        }
    }
    let app = await app.findOne({owner: owner._id, type: type, name: appParams.name, name_zh: appParams})
    if(!app){
        app = new App({
            ...appParams,
        });
    }else{
        return {
            msg: "APP_NAME_EXSIT",
            app
        }
    }
    

    let appOwner = await AppOwner.findOne({owner: owner._id});
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
                return {msg: "success", app};
            
            case "storage":
                app.type = "storage";
                await app.save();
                return {msg: "success", app};
        
            default:
                await app.save();
                return {msg: "success", app};
        }
    } catch (error) {
        console.log(error);
        
    }

    

}


export async function setDefaultApp(){
    
    let app = await App.findOne({isDefault: true, name: 'justMind'});

    const rlt  = await setSuperAdmin();
    const { superAdmin, superRole } = rlt;

    if(app){
        return app;
    }
    else{
        const randomstring = require("randomstring");
       
        app = new App({
            name: 'justMind',
            name_zh: '正觉工场',
            masterSecret: randomstring.generate(),
            secret: randomstring.generate(),
            isDefault: true,// 任何设为isDefault的记录都是系统内置记录，都不可更改和删除
            user: superAdmin,
            hosts: ["zhengjue.lododor.com", "localhost:3000"],
            adminHosts: ["admin.zhengjue.lododor.com"]
        })
        superAdmin.apps.push(app._id);
        superRole.app = app._id;
        app.roles.push(superRole._id);
        app.users.push(superAdmin._id);
        try {
            await superRole.save();
            await superAdmin.save();
            await app.save();
        } catch (error) {
            console.error(error);
            
        }

        
        
    }
        
    try {
        const shop = await setDefaultShop(app, superAdmin);
        const shelf = await setDefaultShelf(shop)
        const  cardClass = await setDefaultAppGoodClass(shop);
        const card = await setDefaultCards(shop, shelf, cardClass);
        cardClass.goods.push(card);
        card.goodClasses = cardClass;

        await cardClass.save();
        await card.save();
        const roles = await setDefaultRoles(app);
        const {nobody, loginedUser} = roles;
        app.roles.push(nobody._id);
        app.roles.push(loginedUser._id);
        await app.save();
        return app;
        
    } catch (error) {
        console.log(error);
        
        return error;
    }
    

    
}


export default  App;