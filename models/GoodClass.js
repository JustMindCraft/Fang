import ShopGoodClass, { getOneGoodClassFromShopId } from './ShopGoodClass';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodClassSchema = new mongoose.Schema({
    name:  String,//在一个app内不可重名
    name_zh: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDefault: Boolean,//默认的分类是规定不可以删除的
});

const GoodClass = mongoose.model('GoodClass', GoodClassSchema);


export async function createGoodClass(params, shopId){
    let goodClass = await getOneGoodClassFromShopId(shopId, {name: params.name});
    if(goodClass){
        return "goodclass in the same shop exists "
    }
    goodClass = new GoodClass({
        ...params
    })
    await goodClass.save();
    //关联店铺
    let shopGoodClass = await ShopGoodClass.findOne({goodClass: goodClass._id, shop: shopId});

    if(shopGoodClass){
        return goodClass;

    }

    shopGoodClass = new ShopGoodClass({
        shop: shopId,
        goodClass: goodClass._id,
    })

    await shopGoodClass.save();

    return goodClass;



}

export default  GoodClass;