var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppShopSchema = new mongoose.Schema({
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    shop: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const AppShop = mongoose.model('AppShop', AppShopSchema);

export default  AppShop;