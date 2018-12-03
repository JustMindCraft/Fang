var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodSpecificationSchema = new mongoose.Schema({
    good: { type: Schema.Types.ObjectId, ref: 'Good' },
    name: String,
    description: String,
    price: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const GoodSpecification = mongoose.model('GoodSpecificationSchema', GoodSpecificationSchema);

export default  GoodSpecification;