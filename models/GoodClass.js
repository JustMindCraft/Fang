import ShopGoodClass, { getOneGoodClassFromShopId } from './ShopGoodClass';
import defaultFields from '../config/defaultFields';

var mongoose = require('mongoose');
const GoodClassSchema = new mongoose.Schema({
    name:  String,//在一个app内不可重名
    name_zh: String,
    isDefault: Boolean,//默认的分类是规定不可以删除的
    ...defaultFields
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