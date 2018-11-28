var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ShopSchema = new mongoose.Schema({
    name: String,
    name_zh: String,
    description: String,
    app:  { type: Schema.Types.ObjectId, ref: 'App' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    cardLevelCurrent: Number,//说明在此店内卡片已经增长到的等级
  });

const Shop = mongoose.model('Shop', ShopSchema);

export default  Shop;