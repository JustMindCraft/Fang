import defaultFields from '../config/defaultFields';
import { getDefaultShop } from './AppShop';
import seed from '../config/seed';
import GoodClass, { createGoodClass } from './GoodClass';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ShopGoodClassSchema = new mongoose.Schema({
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    goodClass: { type: Schema.Types.ObjectId, ref: 'GoodClass' },
    isDefault: {type: Boolean, default: false},
    ...defaultFields
  });

const ShopGoodClass = mongoose.model('ShopGoodClass', ShopGoodClassSchema);



export async function getDefaultGoodClasses(){
  try {
    const defaultShop = await getDefaultShop();
    const defaultShopClasses = await ShopGoodClass.find({isDefault: true, isDeleted: false, shop: defaultShop._id})
      .populate('goodClass', ['_id', 'name']).select(['goodClass']);
    return defaultShopClasses;
  } catch (error) {
    console.error(error);
    return false;
    
  }
  
}

export async function fitDefaultGoodClassesWithConfig(){
  try {
    const defaultShop = await getDefaultShop();
    const configGoodClasses = seed.defaultShop.classes;
    configGoodClasses.forEach(async goodClass => {
      const goodClassDeal = await GoodClass.findOne({name: goodClass, isDefault: true, isDeleted: false});
      if(!goodClassDeal){
        await createGoodClass({
          name: goodClass,
          name_zh: goodClass,
          isDefault: true,
          isDeleted: false,

        }, defaultShop._id);
      }else{
         const shopGoodClassDeal = await ShopGoodClass.findOne({goodClass: goodClassDeal._id, isDefault: true, isDeleted: false});
         if(shopGoodClassDeal.shop !== defaultShop._id){
           await ShopGoodClass.updateOne({goodClass: goodClassDeal._id}, {
             $set: {
               shop: defaultShop._id,
             }
           })
         }
         if(!shopGoodClassDeal){
           await new ShopGoodClass({
            shop: defaultShop._id,
            goodClass: goodClassDeal._id,
            isDefault: true,
            isDeleted: false,
           }).save();
         }
      }
    });
    const defaultShopClasses = await ShopGoodClass.find({isDefault: true, isDeleted: false, shop: defaultShop._id})
    .populate('goodClass', ['_id', 'name']).select(['goodClass', 'shop']);
    //开始删除冗余产品类型
    let countGoodClassName = {};
    
    defaultShopClasses.forEach(async shopGoodClass=>{
      if(configGoodClasses.includes(shopGoodClass.goodClass.name)){
        if(!countGoodClassName[shopGoodClass.goodClass.name]){
          countGoodClassName[shopGoodClass.goodClass.name]=1;
        }else{
          await ShopGoodClass.deleteOne({_id: shopGoodClass._id});
          await GoodClass.deleteOne({_id: shopGoodClass.goodClass._id});
        }
      }else{
        await ShopGoodClass.deleteOne({_id: shopGoodClass._id});
        await GoodClass.deleteOne({_id: shopGoodClass.goodClass._id});
      }
      
    })
    return true;
  } catch (error) {
    console.error(error);
    return false;
    
  }
  
 
}


export async function getOneGoodClassFromShopId(shopId, fields=['name','_id'], match){
  const goodClass = await GoodClass.findOne(match)
  const shopGoodClass = await ShopGoodClass.findOne({goodClass, shop: shopId})
  .populate('goodClass', fields, match).select('goodClass')
  
  return shopGoodClass? shopGoodClass.goodClass: null;
}

export async function getOneShopFromGoodClassId(goodClassId, fields=['name','_id'], match){
  let shopGoodClass = await ShopGoodClass.findOne({goodClass: goodClassId},['shop']).populate('shop', fields, match);
  return shopGoodClass? shopGoodClass.shop: null;
}

export default  ShopGoodClass;