var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodLimitTimePriceSchema = new mongoose.Schema({
    good: { type: Schema.Types.ObjectId, ref: 'Good' },
    begin: { type: Date, default: Date.now }, //从什么时候起，
    last: Number, //持续多久
    priceAdjust: Number, //期间价格多少, exg: -400 减免4元
    roles: [{type: Schema.Types.ObjectId, ref: 'Role'}], //享受的角色
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const GoodLimitTimePrice = mongoose.model('GoodLimitTimePrice', GoodLimitTimePriceSchema);

export default  GoodLimitTimePrice;