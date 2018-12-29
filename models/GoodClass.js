import ShopGoodClass, { getOneGoodClassFromShopId } from './ShopGoodClass';
import defaultFields from '../config/defaultFields';
import { isShopIdExists } from './Shop';

var mongoose = require('mongoose');
const GoodClassSchema = new mongoose.Schema({
    name:  String, //在一个shop内不可重名
    name_zh: String,
    isDefault: {type: Boolean, default: false}, //默认的分类是规定不可以删除的
    ...defaultFields
});

const GoodClass = mongoose.model('GoodClass', GoodClassSchema);


export async function createGoodClass(params, shopId){
    try {
        const isExists = await isShopIdExists(shopId);
        if(!isExists){
            assert.fail('shopId_is_not_an_effictive_shop');
        }
        let goodClass = await getOneGoodClassFromShopId(shopId,['name', '_id'], {name: params.name});
        
        if(goodClass){
            return "goodclass_in_the_same_shop_exists";
        }
        goodClass = new GoodClass({
            ...params
        })
        await goodClass.save();

        await new ShopGoodClass({
            shop: shopId,
            goodClass: goodClass._id,
            isDefault: goodClass.isDefault,
        }).save();

        return true;
    } catch (error) {
        console.error(error);
        return false;

        
    }
    



}


//================初始化产品分类方法======================


export async function isDefaultGoodClassFitConfig(){
    const defaultGoodClass = await GoodClass.findOne({});

}

//==================初始化产品分类方法结束

export default  GoodClass;