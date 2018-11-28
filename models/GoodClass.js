var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodSchema = new mongoose.Schema({
    name:  String,
    name_zh: String,
    createdByShop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    agencyShops: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    createdAt: { type: Date, default: Date.now },
  });

const Good = mongoose.model('Role', GoodSchema);

export default  Good;