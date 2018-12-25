import defaultFields from '../config/defaultFields';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppShopSchema = new mongoose.Schema({
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    shop: { type: Schema.Types.ObjectId, ref: 'User' },
    isDefault: { type: Boolean, default: false},
    ...defaultFields
  });

const AppShop = mongoose.model('AppShop', AppShopSchema);

export async function getShopFromApp(appId, fields, match){
  const appShop = await AppShop.findOne({app: appId}).populate("shop", fields, match);
  return appShop? appShop.shop : null;
}

export async function appShopIsMatch(appId, shopId){
  const appShop = await AppShop.findOne({appId, shopId});
  if(appShop){
    return true;
  }
  return false;
}

export default  AppShop;