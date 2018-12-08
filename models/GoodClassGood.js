import Good from './Good';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodClassGoodSchema = new mongoose.Schema({
    goodClass: { type: Schema.Types.ObjectId, ref: 'GoodClass' },
    good: { type: Schema.Types.ObjectId, ref: 'Good' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const GoodClassGood = mongoose.model('GoodClassGood', GoodClassGoodSchema);


export async function getOneGoodFromGoodClassId(goodClassId, match){
  let goodClassGood = GoodClassGood.findOne({goodClass: goodClassId})
  .populate('good', ['name', 'name_zh'],Good, match);
  return goodClassGood? goodClassGood.good : null;
}


export default  GoodClassGood;