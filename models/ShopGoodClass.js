var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ShopGoodClassSchema = new mongoose.Schema({
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    goodClass: { type: Schema.Types.ObjectId, ref: 'GoodClass' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const ShopGoodClass = mongoose.model('ShopGoodClass', ShopGoodClassSchema);


export async function getOneGoodClassFromShopId(shopId, match){
  let shopGoodClass = await ShopGoodClass.findOne({shop: shopId},['goodClass']).populate('goodClass', ['name','_id'], match);
  return shopGoodClass? shopGoodClass.goodClass: null;
}

export async function getOneShopFromGoodClassId(goodClassId, match){
  let shopGoodClass = await ShopGoodClass.findOne({goodClass: goodClassId},['shop']).populate('shop', ['name','_id'], match);
  return shopGoodClass? shopGoodClass.shop: null;
}

export default  ShopGoodClass;