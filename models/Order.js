var mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  // 订单始终就是店铺的订单
    contact: Object,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    totalCost: Number,
    status: String,
  });

const Order = mongoose.model('Order', OrderSchema);

export default  Order;