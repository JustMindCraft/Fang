var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodClassSuperSchema = new mongoose.Schema({
    goodClass: { type: Schema.Types.ObjectId, ref: 'GoodClass' },
    super: { type: Schema.Types.ObjectId, ref: 'GoodClass' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const GoodClassGoodSuper = mongoose.model('GoodClassGoodSuper', GoodClassSuperSchema);

export default  GoodClassGoodSuper;