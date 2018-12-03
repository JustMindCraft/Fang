var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodRolePriceSchema = new mongoose.Schema({
    good: { type: Schema.Types.ObjectId, ref: 'Good' },
    role: { type: Schema.Types.ObjectId, ref: 'Role' }, // exg somcoupon_holder//某个优惠券持有者
    priceAdjust: Number, //exg: -300 ， 减免3元
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const GoodProperty = mongoose.model('GoodProperty', GoodRolePriceSchema);

export default  GoodProperty;