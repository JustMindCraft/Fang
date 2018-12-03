var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ShopShelfSchema = new mongoose.Schema({
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    shelf: { type: Schema.Types.ObjectId, ref: 'Shelf' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const ShopShelf = mongoose.model('ShopShelf', ShopShelfSchema);

export default  ShopShelf;