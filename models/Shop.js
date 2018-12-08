import AppShop from './AppShop';

var mongoose = require('mongoose');
const ShopSchema = new mongoose.Schema({
    name: String,
    name_zh: String,
    description: String,
    isDefault: Boolean,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    cardLevelCurrent: Number,//说明在此店内卡片已经增长到的等级

  });

const Shop = mongoose.model('Shop', ShopSchema);

export async function createShop(shopParams, appId){
    
    
    let shop = await Shop.findOne({name: shopParams.name, name_zh: shopParams.name_zh});
    
    if(!shop){
        shop = new Shop({
            ...shopParams
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