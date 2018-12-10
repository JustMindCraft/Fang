import defaultFields from '../config/defaultFields';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppShopSchema = new mongoose.Schema({
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    shop: { type: Schema.Types.ObjectId, ref: 'User' },
    ...defaultFields
  });

const AppShop = mongoose.model('AppShop', AppShopSchema);

export default  AppShop;