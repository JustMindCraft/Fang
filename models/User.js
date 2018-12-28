import bcrypt from 'bcrypt-nodejs';
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


export async function isUserIdExists(userId){
     const user = User.findOne({_id: userId, isDeleted: false});
     if(user){
         return true;
     }
     return false;

}

export async function getSuperAdmin(){
    const user = User.findOne({isSuper: true, isDeleted: false})
    return user? user: "not_found";
}



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
        isSuper: true,
    })
    await user.save();
    return true;

}

async function updateSuperAdmin(){
    const salt = bcrypt.genSaltSync(Math.random(10));
    const hash = bcrypt.hashSync(seed.superAdmin.password, salt);
    return await User.updateOne({isSuper: true},{
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
            console.log("seed已经更改，正在更新超级管理员数据");
            
            return await updateSuperAdmin()
        }
    }
    
    return await createSuperAdmin();
}

// =====================创建超级管理员相关结束===========




export default  User;