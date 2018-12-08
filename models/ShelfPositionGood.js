var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ShelfPositionGoodSchema = new mongoose.Schema({
    shelf: { type: Schema.Types.ObjectId, ref: 'Shelf' },
    good: { type: Schema.Types.ObjectId, ref: 'Good' },
    positonX: Number,
    positonY: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const ShelfPositionGood = mongoose.model('ShelfPositionGood', ShelfPositionGoodSchema);



export default  ShelfPositionGood;