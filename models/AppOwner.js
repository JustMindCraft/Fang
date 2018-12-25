import defaultFields from '../config/defaultFields';

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

export async function getOwner(appId="unknown"){
  
  const appOwner = await AppOwner.findOne({app: appId, isDeleted: false}).populate('owner',{isDeleted: false});
  
  return appOwner? appOwner.owner: null;
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