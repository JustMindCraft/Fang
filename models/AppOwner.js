import defaultFields from '../config/defaultFields';
import { isAppIdExists } from './App';

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
  if(!(await isUserIdExist(userId))){
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


export async function bindAppForUser(appId, ownerId){
  if(!appId){
    return "APPID REQUIRED";
  }
  if(!ownerId){
    return "OWNERID RQUIRED";
  }
  try {
    const appOwner = new AppOwner({
      app: appId, 
      owner: ownerId,
    })
    await appOwner.save();
    return appOwner;

  } catch (error) {
    console.error(error);
    return "bindAppForUser SOMETHING WRONG";
    
  }
  
}

export async function appOwnerIsMatch(appId, ownerId){
  const appOnwer = await AppOwner.findOne({app: appId, owner: ownerId, status: 'normal'});
  if(appOnwer){
    return true;
  }
  return false;
}

export async function unbindAppsForOnwer(ownerId='unknown', match={}){
  const appOwnerRemoveRlt = await AppOwner.deleteMany({owner: ownerId, ...match});
  if(appOwnerRemoveRlt){
    return true;
  }
  return false;
}

export async function blockAppsForOnwer(ownerId='unknown', match={}){
  try {
    const appOwnerRemoveRlt = await AppOwner.updateMany({owner: ownerId, ...match}, {
      $set: {
        status: 'blocked'
      }
    });
    if(appOwnerRemoveRlt){
      return true;
    }
  } catch (error) {
    console.error(error);
    return "blockAppsForOnwer SOMETHING WRONG"
    
  }
  
 
  return false;
}

export async function unbindOwnerForApp(appId, ownerId){
  const appOnwerRemoveRlt = await AppOwner.deleteOne({app: appId, owner: ownerId});
  if(appOnwerRemoveRlt){
    return true;
  }
  return false;
}

export default  AppOwner;