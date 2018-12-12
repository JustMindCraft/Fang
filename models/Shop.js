import AppShop from './AppShop';
import defaultFields from '../config/defaultFields';

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

export async function createShop(params={}, appId='unknown'){
    
    
    let shop = await Shop.findOne({name: params.name, name_zh: params.name_zh});
    
    if(!shop){
        shop = new Shop({
            ...params
        })
       
        await shop.save();
    }else{
        return "SHOP_NAME_TAKEN";
    }

    let appShop = new AppShop({
        shop: shop._id,
        app: appId,
    })
    await appShop.save();
    
    return shop;
}




export default  Shop;