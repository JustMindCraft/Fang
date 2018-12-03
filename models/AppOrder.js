var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppOrderSchema = new mongoose.Schema({
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const AppOrder = mongoose.model('AppOrder', AppOrderSchema);

export default  AppOrder;