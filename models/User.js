import Role, { createSuperRole } from './Role';
import bcrypt from 'bcrypt-nodejs';
import RoleUser from './RoleUser';
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
    isDefault: {type: Boolean, default: false},
    version: { type: Number, default: 1 },//标记版本，若是不存在则说明这是上一个版本的老用户
    ...defaultFields
    
  });


const User = mongoose.model('User', UserSchema);

async function setAdmin(){
        const salt  =  bcrypt.genSaltSync(10);
        const passwordPlain = "superAdmin2019best"
        const password =  bcrypt.hashSync(passwordPlain, salt);
        const superAdmin = new User({
            username: 'superAdmin',
            password,
            isPasswordSettledByUser: false,
            isDefault: true,
        });
        return superAdmin;
}

export async function isSuperAdminExist(){
    const user = await User.findOne({name: 'superAdmin', isDefault: true, isDeleted: false});
    if(user){
        return true;
    }
    return false;
}


export async function setSuperAdmin(){
  let superRole = await Role.findOne({name: 'superAdmin', isSuper: true, isDefault: true});
  let roleUser = null;
  if(!superRole){
      superRole = await createSuperRole();
      roleUser = new RoleUser({
          role: superRole._id,
      });

  }else{
      roleUser = await RoleUser.findOne({role: superRole._id, isDeleted: false})
      if(!roleUser){
          roleUser = new RoleUser({
              role: superRole._id,
          });
      }
      
  }
  let superAdmin = await User.findOne({name: 'superAdmin', isDefault: true, isDeleted: false});
  if(!superAdmin){
      superAdmin = await setAdmin();
      roleUser.user = superAdmin._id;
  }else{
      roleUser.user = superAdmin._id;
  }

  try {
      await superAdmin.save();
      await roleUser.save();
      return superAdmin;
  } catch (error) {
      console.error(error);
      return "SOMETHING WRONG"
  }
   
}

export async function findOneWithMobileOrEmailOrUsername(mobileOrEmailOrUsername="null"){
//根据用户名，邮箱或者手机号查找一个用户
    if(!mobileOrEmailOrUsername){
        return null;
    }
    const user = await User.findOne({$or: [
        {username: mobileOrEmailOrUsername},
        {email: mobileOrEmailOrUsername},
        {mobile: mobileOrEmailOrUsername}
    ]})
    if(!user){
        return null;
    }

    return user;
}//end of function

export default  User;