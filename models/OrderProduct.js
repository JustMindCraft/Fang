var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const OrderProductSchema = new mongoose.Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Role' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    count: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const OrderProduct = mongoose.model('OrderProduct', OrderProductSchema);

export default  OrderProduct;