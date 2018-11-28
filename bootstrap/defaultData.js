import Role from "../models/Role";
import App from "../models/App";

import bcrypt from 'bcrypt-nodejs';
import Shop from "../models/Shop";

function getDefaultApp(secret){
    let defaultApp = App.findOne({isDefault: true});
    if(!defaultApp){
        const JWT    = require('jsonwebtoken');
        const owner = getSuperAdmin();
        const masterSecret = JWT.sign(owner, secret); 
        const app = new App({
            name: 'justMind',
            name_zh: '正觉工场',
            masterSecret,
            user: owner
        })
        const appSecret = JWT.sign(app, secret);
        app.secret = appSecret;
        
    }
    return defaultApp;
}

function getSuperAdmin(){
    let superRole = Role.findOne({isSuper: true, isDefault: true});
    if(!superRole){
        superRole = new Role({
            name: 'superAdmin',
            name_zh: "超级管理员",
            isSuper: true,
        })
    }
    let superAdmin = User.findOne({role: superRole});
    if(!superAdmin){
        const salt  = Math.random();
        const passwordPlain = "superAdmin2019best"
        const password = bcrypt.hashSync(passwordPlain, salt);
        superAdmin = new User({
            name: 'superAdmin',
            password,
            role: [superRole]
        });
    }
    return superAdmin;
}


function getDefaultShop(secret){
    let shop = Shop.findOne({app: getDefaultApp(secret)});
    if(!shop){
        shop = new Shop({
            name: "justMindShop",
            zh_name: "正觉商城",
        })
    }
}

function getDefaultCards(){
    //商店默认可以出售0级别会员卡
}

function getDefaultGoodClass(){
    //商店默认新建会员卡类别，包括了零级别会员卡

}

function getDefaultRole(){
    //默认的角色还包括nobody游客，loginedUser登录游客

}


export default function fixtureDefaultData(secret){

}