var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ShopGoodClassSchema = new mongoose.Schema({
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    goodClass: { type: Schema.Types.ObjectId, ref: 'GoodClass' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const ShopGoodClass = mongoose.model('RoleUser', ShopGoodClassSchema);

export default  ShopGoodClass;