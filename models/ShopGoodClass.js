import defaultFields from '../config/defaultFields';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ShopGoodClassSchema = new mongoose.Schema({
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    goodClass: { type: Schema.Types.ObjectId, ref: 'GoodClass' },
    ...defaultFields
  });

const ShopGoodClass = mongoose.model('ShopGoodClass', ShopGoodClassSchema);


export async function getOneGoodClassFromShopId(shopId, fields=['name','_id'], match){
  let shopGoodClass = await ShopGoodClass.findOne({shop: shopId},['goodClass']).populate('goodClass', fields, match);
  return shopGoodClass? shopGoodClass.goodClass: null;
}

export async function getOneShopFromGoodClassId(goodClassId, fields=['name','_id'], match){
  let shopGoodClass = await ShopGoodClass.findOne({goodClass: goodClassId},['shop']).populate('shop', fields, match);
  return shopGoodClass? shopGoodClass.shop: null;
}

export default  ShopGoodClass;