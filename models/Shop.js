import AppShop from './AppShop';
import defaultFields from '../config/defaultFields';
import { isUserIdExist } from './User';
import { isAppIdExists } from './App';
import ShopOwner, { assginOwnerForShop } from './ShopOwner';

var mongoose = require('mongoose');
const ShopSchema = new mongoose.Schema({
    name: {type: String, default: require('uuid/v1')()+"_nonameshop"},
    name_zh: {type: String, default: "未命名店铺"},
    description: {type: String, default: "店铺尚未简介"},
    isDefault: {type: Boolean, default: false},
    cardLevelCurrent: {type: Number, default: 0},//说明在此店内卡片已经增长到的等级
    ...defaultFields

  });

const Shop = mongoose.model('Shop', ShopSchema);

export async function isShopNameExists(name){
    const shop = await Shop.findOne({name, isDelete: false})
    if(shop){
        return true;
    }
    return false;
}

export async function createShop(params={}, appId=null, owner=null){
    if(!params.name){
        assert.fail("params.name必需传入,检查Shop#createShop方法")
        return false;
    }
    if(!(await isShopNameExists(name))){
        return "shop_name_already_exists";
    }
    if(!(await isUserIdExist(owner))){
        return "owner_is_not_an_effictive_user";
    }
    if(!(await isAppIdExists(appId))){
        return 'appId_is_not_an_effictive_app';
    }
    const shop = new Shop({
        ...params,
    });

    try {
        await shop.save();
        let rlt = await assginOwnerForShop(ownerId, shop._id);
        if(rlt !== "shop_or_owner_already_assigned"){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        assert.fail(error);
        return false;
    }
    
    
}




export default  Shop;