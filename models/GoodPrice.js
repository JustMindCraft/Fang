var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodPriceSchema = new mongoose.Schema({
    good: { type: Schema.Types.ObjectId, ref: 'Good' },
    priceUse: Array, 
    // 说明价格最终使用那些属性， specification为原价的基础上，
    // [限时，头多少人下单，大于多少量，部分角色优惠]，所有属性叠加
    specification: { type: Schema.Types.ObjectId, ref: 'GoodSpecification' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const GoodPrice = mongoose.model('GoodPrice', GoodPriceSchema);

export default  GoodPrice;