var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserOrderSchema = new mongoose.Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Order'},
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: String,//用户订单的状态和订单的状态不一样，是订单状态的子集
  });

const UserOrder = mongoose.model('UserOrder', UserOrderSchema);

export default  UserOrder;