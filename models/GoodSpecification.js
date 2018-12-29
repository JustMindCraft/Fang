var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodSpecificationSchema = new mongoose.Schema({
    good: { type: Schema.Types.ObjectId, ref: 'Good' },
    name: {type: String, default: '默认规格'},
    description: {type: String, default: '默认规格'},
    price: {type: Number, default: 1},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const GoodSpecification = mongoose.model('GoodSpecificationSchema', GoodSpecificationSchema);

export default  GoodSpecification;