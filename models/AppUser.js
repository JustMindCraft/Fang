import { isUserIdExists } from './User';
import { isAppIdExists } from './App';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AppUserSchema = new mongoose.Schema({
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const AppUser = mongoose.model('AppUser', AppUserSchema);

export async function makeUserBelongApp(userId, appId){
  
  //此处是多对多的关系
  if(!(await isUserIdExists(userId))){
    return "userId_is_not_an_effective_user";
  }
  if(!(await isAppIdExists(appId))){
    return "appId_is_not_an_effictive_app";
  }
  let appUser = await AppUser.findOne({user: userId, app: appId});
  if(appUser){

    return "app_user_relation_already_exist";
  }else{
    
    try {
      appUser = new AppUser({
        user: userId, app: appId,
      })
      await appUser.save();
      return true;
    } catch (error) {
      assert.fail(error);
    }
  }


}

export default  AppUser;