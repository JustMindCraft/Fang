var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppGoodSchema = new mongoose.Schema({
    good: { type: Schema.Types.ObjectId, ref: 'Good' },
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const AppGood = mongoose.model('GoodCreatedByShop', AppGoodSchema);

export default  AppGood;