import defaultFields from '../config/defaultFields';
import { getDefaultShop } from './AppShop';
import seed from '../config/seed';
import GoodClass, { createGoodClass } from './GoodClass';
import { notEqual } from 'assert';

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
  const defaultShop = await getDefaultShop();
  const shopGoodClass = await ShopGoodClass
  .find({shop: defaultShop._id, isDefault: true, isDeleted: false})
  .populate('goodClass', ['_id', 'name'], {isDefault: true, isDeleted: false});
  return shopGoodClass;
}

export async function fitDefaultGoodClassesWithConfig(){
  try {
    const defaultShop = await getDefaultShop();
    const configClasses = seed.defaultShop.classes;
    
    configClasses.forEach(async configClass=>{
     try {
      const  shopGoodClassTest = await ShopGoodClass.find({shop: defaultShop._id, isDefault: true, isDeleted: false})
      .populate('goodClass', ['_id', 'name'], {isDefault: true, isDeleted: false, name: configClass}).select('goodClass').count();
      console.log(shopGoodClassTest);
     } catch (error) {
       console.log(error);
       
     }
      const shopGoodClass = await ShopGoodClass.findOne({shop: defaultShop._id, isDefault: true, isDeleted: false})
      .populate('goodClass', ['_id', 'name'], {isDefault: true, isDeleted: false, name: configClass});
      
      // console.log({shopGoodClass});
      

      if(!shopGoodClass || !shopGoodClass.goodClass){
        //创建新没有的产品分类
        await createGoodClass({
          name: configClass,
          name_zh: configClass,
          isDefault: true,
        }, defaultShop._id);
      }
      
    });
    const shopGoodClasses = await ShopGoodClass.find({isDefault: true, isDeleted: false})
    .populate('goodClass', ['_id', 'name'], {isDefault: true, isDeleted: false});
    console.log({shopGoodClasses});
    
    shopGoodClasses.forEach(async shopGoodClass=> {
      const shopName = shopGoodClass.goodClass.name;
      console.log({shopName});
      if(!configClasses.includes(shopName)){
        //删除冗余数据
        await GoodClass.remove({name: shopName});
        await ShopGoodClass.remove({_id: shopGoodClass._id});
      }
    })
    return true;
  } catch (error) {
    console.error(error);
    return false;
    
  }
  
 
}


export async function getGoodClassesFromShopId(shopId, fields=['name','_id'], match){
  let shopGoodClasses = await ShopGoodClass.find({shop: shopId},['goodClass'])
  .elemMatch('goodClass', {goodClass: {$ne: null}} )
  .populate('goodClass', fields, match)
  ;
  console.log('获取店铺的产品类别', shopGoodClasses)
  
  return shopGoodClasses;
}

export async function getOneShopFromGoodClassId(goodClassId, fields=['name','_id'], match){
  let shopGoodClass = await ShopGoodClass.findOne({goodClass: goodClassId},['shop']).populate('shop', fields, match);
  return shopGoodClass? shopGoodClass.shop: null;
}

export default  ShopGoodClass;