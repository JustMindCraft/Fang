var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const OrderSchema = new mongoose.Schema({
    products: [{ type: Schema.Types.ObjectId, ref: 'Product'}],
    productsCounts: Object,
    /**
     * {
     *      'productId': Number,
     * }
     */
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    contact: Object,
    createdAt: { type: Date, default: Date.now },
    totalCost: Number,
    status: String,
  });

const Order = mongoose.model('Order', OrderSchema);

export default  Order;