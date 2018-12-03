var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const OrderBookerSchema = new mongoose.Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Role' },
    booker: { type: Schema.Types.ObjectId, ref: 'Booker' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const OrderBooker = mongoose.model('OrderBooker', OrderBookerSchema);

export default  OrderBooker;