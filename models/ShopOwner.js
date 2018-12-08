var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ShopOwnerSchema = new mongoose.Schema({
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const ShopOwner = mongoose.model('ShopOwner', ShopOwnerSchema);


export async function assginOwnerForShop(ownerId, shopId){
    let shopOwner = await ShopOwner.findOne({shop: shopId, owner: ownerId});
    if(!shopOwner){
        shopOwner = new ShopOwner({
            shop: shopId,
            owner: ownerId,
        })
    }else{
        return {
            msg: "SHOP OR OWNER ALREADY ASSIGN",
            shopOwner
        }
    }
    await shopOwner.save();

    return {
        msg: "CREATE SUCCESS",
        shopOwner
    }
}

export default  ShopOwner;