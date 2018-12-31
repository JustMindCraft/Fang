import { makeShopBelongApp, getDefaultShop } from './AppShop';
import defaultFields from '../config/defaultFields';
import { isUserIdExists, getSuperAdmin } from './User';
import { isAppIdExists, getDefaultApp } from './App';
import { assginOwnerForShop } from './ShopOwner';
import assert from 'assert'
import seed from '../config/seed';
import GoodClass from './GoodClass';
import { createGood } from './Good';

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
    
    if(shop){
        return true;
    }
    return false;
}

export async function isShopIdExists(shopId){
    const shop = await Shop.findOne({_id: shopId, isDeleted: false})
    
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
    

    try {
        await shop.save();
        await assginOwnerForShop(owner, shop._id);
        
        await makeShopBelongApp(shop._id, appId, shop.isDefault);
        
        const defaultGoodClass = new GoodClass({
            isDefault: true,
            name: shop.name+'vip',
            name_zh: shop.name+'会员卡'
        });
        const defaultShopGoodClass = new GoodClass({
            isDefault: true,
            shop: shop._id,
            goodClass: defaultGoodClass._id,
        })
        await defaultShopGoodClass.save();
        await defaultGoodClass.save();
        await createGood({
            name: 'level0card',
            name_zh: '零级会员卡'
        },defaultGoodClass._id, true);
        return true;
        
    } catch (error) {
        assert.fail(error);
        return false;
    }
    
    
}


//=====begin=======初始化默认店铺相关方法
export async function isDefaultShopExist(){
    const shop = await getDefaultShop();
    if(shop){
        return true;
    }
    return false;
}
export async function isDefaultShopFitConfig(){
    const shopName = seed.defaultShop.name;
    const shopDescription = seed.defaultShop.description;
    const shop = await Shop.findOne({
        name: shopName, 
        description: 
        shopDescription, 
        isDefault: true,
        isDeleted: false
    })
    if(shop){
        return true;
    }
    return false;
}
export async function updateOneShop(params, shopId){
    const isExists = await isShopIdExists(shopId);
    if(!isExists){
        assert.fail('shopId_is_not_an_effictive_shop');
    }
    try {
        return await Shop.updateOne({_id: shopId}, {
            $set: {
                ...params,
            }
        })
    } catch (error) {
        assert.fail(error);
    }
}

export async function initDefaultShop(){
    const shopName = seed.defaultShop.name;
    const shopDescription = seed.defaultShop.description;
   
    try {
        const isExist = await isDefaultShopExist();
        const owner = await getSuperAdmin();
        const app = await getDefaultApp();
        if(!isExist){
             await createShop({
                name: shopName, 
                description: 
                shopDescription, 
                isDefault: true,
                isDeleted: false
            }, app._id, owner._id);
        }
        const shop = await getDefaultShop();
        const isFitConfig = await isDefaultShopFitConfig();
        if(!isFitConfig){
            console.log("正在更新默认店铺信息");
            
             await updateOneShop({
                name: shopName, 
                description: 
                shopDescription, 
                isDefault: true,
                isDeleted: false
            }, shop._id)
        }
        await makeShopBelongApp(shop._id, app._id, true);
        
        return true;
    } catch (error) {
        console.error(error);
        
        return false;
    }


    
}

//====end===========初始化默认店铺相关方法



export default  Shop;