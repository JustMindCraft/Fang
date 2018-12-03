var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodPropertySchema = new mongoose.Schema({
    good: { type: Schema.Types.ObjectId, ref: 'Good' },
    name: String,
    value: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const GoodProperty = mongoose.model('GoodProperty', GoodPropertySchema);

export default  GoodProperty;