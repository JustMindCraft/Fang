var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ShopOrderSchema = new mongoose.Schema({
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const ShopOrder = mongoose.model('ShopOrder', ShopOrderSchema);

export default  ShopOrder;