import AppShop, { makeShopBelongApp } from './AppShop';
import defaultFields from '../config/defaultFields';
import { isUserIdExists } from './User';
import { isAppIdExists } from './App';
import ShopOwner, { assginOwnerForShop } from './ShopOwner';
import assert from 'assert'

var mongoose = require('mongoose');
const ShopSchema = new mongoose.Schema({
    name: {type: String, default: require('uuid/v1')()+"_nonameshop"},
    name_zh: {type: String, default: ""},
    description: {type: String, default: "店铺尚未简介"},
    isDefault: {type: Boolean, default: false},
    cardLevelCurrent: {type: Number, default: 0},//说明在此店内卡片已经增长到的等级
    ...defaultFields

  });

const Shop = mongoose.model('Shop', ShopSchema);

export async function isShopNameExists(name){
    const shop = await Shop.findOne({name, isDelete: false})
    console.log(shop);
    
    if(shop){
        return true;
    }
    return false;
}

export async function isShopIdExists(shopId){
    const shop = await Shop.findOne({_id: shopId, isDeleted: false})
    console.log(shop);
    
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
    if(await isShopNameExists(params.name)){

        return "shop_name_already_exists";
    }
    if(!(await isUserIdExists(owner))){

        return "owner_is_not_an_effictive_user";
    }
    if(!(await isAppIdExists(appId))){

        return 'appId_is_not_an_effictive_app';
    }
    const shop = new Shop({
        ...params,
    });
    console.log(shop);
    

    try {
        await shop.save();
        await assginOwnerForShop(owner, shop._id);
        console.log('把店铺绑定给app');
        
        return await makeShopBelongApp(shop._id, appId);
        
    } catch (error) {
        assert.fail(error);
        return false;
    }
    
    
}




export default  Shop;