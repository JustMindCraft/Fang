import defaultFields from '../config/defaultFields';
import { isAppIdExists } from './App';
import assert from 'assert';
import { isUserIdExists } from './User';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppOwnerSchema = new mongoose.Schema({
    app: { type: Schema.Types.ObjectId, ref: 'App', default: null },
    owner: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    status: { type: String, default: 'normal' },
    isDefault: { type: Boolean, default: false },
    ...defaultFields
  });

const AppOwner = mongoose.model('AppOwner', AppOwnerSchema);

export async function getOwner(appId=null, match={}){
  
  const appOwner = await AppOwner.findOne({app: appId, isDeleted: false}).populate('owner',{...match, isDeleted: false});
  
  return appOwner? appOwner.owner: null;
}

export async function getApp(userId=null, match={}){
  const appOwner = await AppOwner.findOne({owner: userId, isDeleted: false}).populate('app',{...match,isDeleted: false});
  return appOwner? appOwner.app: null;
}


export async function makeUserOwnApp(userId, appId){
  //注意owner和app是一对多的关系
  if(!(await isUserIdExists(userId))){
    return "userId_is_not_an_effective_user";
  }
  if(!(await isAppIdExists(appId))){
    return "appId_is_not_an_effictive_app";
  }
  const userReplaced = await getOwner(appId);
  if(!userReplaced){
    const appOwner = new AppOwner({
      owner: userId, app: appId
    })
    try {
      await appOwner.save();
      return true;
      
    } catch (error) {
      assert.fail(error);
      return false;
    }
  }else{
    const updateRlt = AppOwner.updateOne({app: appId}, {
      $set: {
        owner: userId,
      }
    })
    if(updateRlt){
      return true;
    }
    else{
      return "user_already_owned_the_app"
    }
  }
  
}

export async function updateOwnerForApp(appId, userId){
  //注意owner和app是一对多的关系
  if(!(await isUserIdExists(userId))){
    return "userId_is_not_an_effective_user";
  }
  if(!(await isAppIdExists(appId))){
    return "appId_is_not_an_effictive_app";
  }

  return  await AppOwner.updateOne({app: appId},{
    $set: {
      user: userId,
    }
  });
  

}




export async function appOwnerIsMatch(appId, ownerId){
  const appOnwer = await AppOwner.findOne({app: appId, owner: ownerId, status: 'normal'});
  if(appOnwer){
    return true;
  }
  return false;
}



export default  AppOwner;