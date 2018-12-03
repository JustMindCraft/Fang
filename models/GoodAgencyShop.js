var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodAgencyShopSchema = new mongoose.Schema({
    good: { type: Schema.Types.ObjectId, ref: 'Good' },
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const GoodAgencyShop = mongoose.model('GoodAgencyShop', GoodAgencyShopSchema);

export default  GoodAgencyShop;