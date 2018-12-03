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

export async function createShop(app, owner, shopParams){
    
    let shop = await Shop.findOne({app: app._id, owner: owner._id, ...shopParams});
    
    if(!shop){
        shop = new Shop({
            name: app.name+"_shop",
            name_zh: app.name_zh+"店铺",
            description: app.name_zh+"店铺",
            app: app._id,
            owner: owner._id,
            createdAt: new Date(),
            cardLevelCurrent: 0,//说明在此店内卡片已经增长到的等级
            idDefault: true,
        })
        owner.shop = shop._id;
        await owner.save();
        await shop.save();
    }
    
    return shop;
}

export default  Shop;