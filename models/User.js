import Role, { createSuperRole } from './Role';
import bcrypt from 'bcrypt-nodejs';
import RoleUser from './RoleUser';
import seed from '../config/seed'
import defaultFields from '../config/defaultFields';

var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    mobile: String,
    password: String,
    isPasswordSettledByUser: {type: Boolean, default: false},
    lastLoginTime: { type: Date, default: Date.now },
    loginRecords: {type: Array, default: []},
    isSuper: {type: Boolean, default: false},
    version: { type: Number, default: 1 },//标记版本，若是不存在则说明这是上一个版本的老用户
    ...defaultFields
    
  });


const User = mongoose.model('User', UserSchema);



// =====================创建超级管理员相关
async function isSuperAdminExists(){
    let user = await  User.findOne({isSuper: true, isDeleted: false});
    if(user){
        return true;
    }
    return false;
    
}


async function isSuperAdminFitConfig(){
    let user = await  User.findOne({isSuper: true, isDeleted: false, username: seed.superAdmin.username});
    if(!user){
        return false;
    }
    let authed = bcrypt.compareSync(seed.superAdmin.password, user.password);
    if(authed){
        return true; 
    }
    return false;

}

async function createSuperAdmin(){
    const salt = bcrypt.genSaltSync(Math.random(10));
    const hash = bcrypt.hashSync(seed.superAdmin.password, salt);
    let user = new User({
        username: seed.superAdmin.username,
        password: hash,
    })
    return await user.save();

}

async function updateSuperAdmin(){
    const salt = bcrypt.genSaltSync(Math.random(10));
    const hash = bcrypt.hashSync(seed.superAdmin.password, salt);
    return await User.update({isSuper: true},{
        $set: {
            username: seed.superAdmin.username,
            password: hash,
        }
    })

}

export async function initSuperAdmin(){
    if(await isSuperAdminExists()){
        if(await isSuperAdminFitConfig()){
            return true;
        }else{
            return await updateSuperAdmin()
        }
    }
    
    return await createSuperAdmin();
}

// =====================创建超级管理员相关结束===========




export default  User;