import defaultFields from '../config/defaultFields';
import { isShopIdExists } from './Shop';
import { isAppIdExists, getDefaultApp } from './App';
import assert from 'assert';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppShopSchema = new mongoose.Schema({
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    isDefault: { type: Boolean, default: false},
    ...defaultFields
  });

const AppShop = mongoose.model('AppShop', AppShopSchema);

export async function getShopFromApp(appId, fields, match){
  const appShop = await AppShop.findOne({app: appId}).populate("shop", fields, match);
  return appShop? appShop.shop : null;
}

export async function getDefaultShop(){
  const app = await getDefaultApp();
  if(!app){
    assert.fail("default_app_is_not_settled");
  }
  
  const appShop = await AppShop.findOne({app: app._id, isDefault: true, isDeleted: false})
  .populate("shop", ['_id', 'name', 'description'],
   {isDeleted: false, isDefault: true});
  
   return appShop? appShop.shop : null;
}

export async function appShopIsMatch(appId, shopId){
  const appShop = await AppShop.findOne({appId, shopId});
  if(appShop){
    return true;
  }
  return false;
}

export async function makeShopBelongApp(shopId, appId, isDefault=false){
  if(!(await isShopIdExists(shopId))){
    return "shopId_is_not_an_effictive_shop";
  }
  if(!(await isAppIdExists(appId))){
    return "appId_is_not_an_effictive_app";
  }
  
  try {
    let appShop = await AppShop.findOne({shop: shopId});
    
    if(appShop){
      if(appShop.app === appId){
        return "app_and_shop_already_match";
      }
      await AppShop.updateOne({shop: shopId}, {
        $set: {
          app: appId,
          isDefault
        }
      })
    }else{
      appShop = new AppShop({
        shop: shopId,
        app: appId,
        isDefault
      })
      await appShop.save();
    }
    
    return true;
  } catch (error) {
    assert.fail(error);
    return false;
  }
  
}

export default  AppShop;