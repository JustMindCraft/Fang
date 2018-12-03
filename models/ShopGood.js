var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ShopGoodSchema = new mongoose.Schema({
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    good: { type: Schema.Types.ObjectId, ref: 'Good' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const ShopGood = mongoose.model('ShopGood', ShopGoodSchema);

export default  ShopGood;