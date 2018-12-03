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

export async function setDefaultAppGoodClass(shop){
    // 设置店铺默认售卖的商品类型
    // 卡片
    let cardClass = await GoodClass.findOne({shop, isDefault: true, name: 'card'});
    if(!cardClass){
        cardClass = new GoodClass({
            name:  'card',//在一个shop内不可重名
            name_zh: shop.app.name+"会员卡",
            shop,
            createdAt: new Date(),
            isDefault: true,//默认的分类是规定不可以删除的
            goods: []
        })

        await cardClass.save();
    }
    // 软件

   return cardClass;
}

export default  GoodClass;